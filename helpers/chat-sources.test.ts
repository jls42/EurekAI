/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import { selectChatSources } from './chat-sources.js';
import type { ModerationStatus, Source } from '../types.js';

const src = (id: string, status?: string): Source => ({
  id,
  filename: `${id}.txt`,
  markdown: `contenu ${id}`,
  uploadedAt: '2026-09-26T00:00:00.000Z',
  ...(status === undefined
    ? {}
    : { moderation: { status: status as ModerationStatus, categories: {} } }),
});

// Une source par cas : 'blocked' = statut inattendu (donnée disque corrompue).
const ALL = [
  src('safe', 'safe'),
  src('unsafe', 'unsafe'),
  src('error', 'error'),
  src('pending', 'pending'),
  src('none'),
  src('weird', 'blocked'),
];

const ids = (sources: Source[]) => sources.map((s) => s.id);

describe('selectChatSources', () => {
  it("modération active : ne garde que les sources safe, dans l'ordre", () => {
    expect(ids(selectChatSources(ALL, { useModeration: true }))).toEqual(['safe']);
  });

  // Source jamais vérifiée (sans objet moderation) : en attente pour la garde, exclue jusqu'à sa
  // vérification (reprise avant ce filtre, routes/chat.ts) ; modération inactive : gardée.
  it('source jamais vérifiée : exclue si la modération est active, gardée sinon', () => {
    expect(selectChatSources([src('none')], { useModeration: true })).toEqual([]);
    expect(ids(selectChatSources([src('none')], { useModeration: false }))).toEqual(['none']);
  });

  it('modération active : un statut inattendu est exclu (fail-closed)', () => {
    expect(selectChatSources([src('weird', 'blocked')], { useModeration: true })).toEqual([]);
  });

  it.each([
    ['modération inactive', { useModeration: false }],
    ['pas de profil (null)', null],
    ['pas de profil (undefined)', undefined],
  ])('%s : toutes les sources, inchangées', (_label, profile) => {
    expect(selectChatSources(ALL, profile)).toEqual(ALL);
  });

  it('ne modifie pas la liste reçue', () => {
    const sources = [...ALL];
    selectChatSources(sources, { useModeration: true });
    expect(sources).toEqual(ALL);
  });

  // Statut EFFECTIF : source persistée `safe` (fenêtre v1.5.4 → v1.7.1) mais `criminal: true`.
  describe('statut effectif (catégories bloquées du profil)', () => {
    const flagged: Source = {
      ...src('flagged'),
      moderation: { status: 'safe', categories: { sexual: false, criminal: true } },
    };
    const legacy: Source = {
      ...src('legacy'),
      moderation: { status: 'safe', categories: { dangerous_and_criminal_content: true } },
    };

    it('safe signalant une catégorie bloquée par le profil → exclue', () => {
      const profile = { useModeration: true, moderationCategories: ['criminal'] };
      expect(ids(selectChatSources([src('safe', 'safe'), flagged], profile))).toEqual(['safe']);
    });

    it('safe signalant une catégorie NON bloquée → gardée', () => {
      const profile = { useModeration: true, moderationCategories: ['sexual'] };
      expect(ids(selectChatSources([flagged], profile))).toEqual(['flagged']);
    });

    it("sans liste propre : défauts de l'âge (enfant bloque criminal, pas dangerous)", () => {
      const profile = { useModeration: true, ageGroup: 'enfant' as const };
      const dangerousOnly: Source = {
        ...src('dangerous'),
        moderation: { status: 'safe', categories: { dangerous: true } },
      };
      expect(ids(selectChatSources([flagged, dangerousOnly], profile))).toEqual(['dangerous']);
    });

    it('clé legacy 2411 stockée à true → comptée pour criminal → exclue', () => {
      const profile = { useModeration: true, moderationCategories: ['criminal'] };
      expect(selectChatSources([legacy], profile)).toEqual([]);
    });

    it('modération inactive : gardée même si elle signale une catégorie bloquée', () => {
      const profile = { useModeration: false, moderationCategories: ['criminal'] };
      expect(ids(selectChatSources([flagged], profile))).toEqual(['flagged']);
    });

    // Liste vide : modération active sans catégorie bloquée → seul le statut persisté compte
    // (une source jamais vérifiée reste en attente : la modération est active).
    it('liste vide : safe signalante gardée, statuts bloquants et non vérifiée exclus', () => {
      const profile = { useModeration: true, moderationCategories: [] };
      expect(ids(selectChatSources([...ALL, flagged], profile))).toEqual(['safe', 'flagged']);
    });

    // Âge illisible sans liste : défauts d'enfant (fail-closed), jamais le prototype.
    it.each(['constructor', '__proto__', 'inconnu'])(
      'âge %s sans liste : défauts enfant (criminal bloqué) → exclue',
      (ageGroup) => {
        const profile = { useModeration: true, ageGroup } as Parameters<
          typeof selectChatSources
        >[1];
        expect(selectChatSources([flagged], profile)).toEqual([]);
      },
    );
  });
});
