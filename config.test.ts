import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  initConfig,
  getConfig,
  saveConfig,
  getApiStatus,
  resetConfig,
  resolveVoices,
  setVoiceCache,
} from './config.js';
import { logger } from './helpers/logger.js';
import { asVoiceId } from './helpers/voice-types.js';
import type { AppConfig } from './types.js';

let tempDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-config-'));
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('initConfig', () => {
  it('sans fichier existant retourne config par defaut', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    expect(cfg.models.summary).toBe('mistral-large-latest');
    expect(cfg.models.quizVerify).toBe('mistral-large-latest');
    expect(cfg.ttsModel).toBe('voxtral-mini-tts-latest');
  });

  it('migration 2026-04 : ttsProvider legacy et ttsModel eleven_* sont normalisés vers Mistral', () => {
    // Un config.json pré-retrait ElevenLabs (ttsProvider + ttsModel eleven_*) doit
    // ressortir de initConfig() nettoyé et réécrit sur disque pour que les anciens
    // utilisateurs basculent silencieusement sur Mistral Voxtral.
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({
        ttsProvider: 'elevenlabs',
        ttsModel: 'eleven_v3',
        voices: { host: { id: 'old', name: 'old' }, guest: { id: 'old', name: 'old' } },
      }),
    );
    initConfig(tempDir);
    const cfg = getConfig() as AppConfig & { ttsProvider?: string; voices?: unknown };
    expect(cfg.ttsProvider).toBeUndefined();
    expect(cfg.voices).toBeUndefined();
    expect(cfg.ttsModel).toBe('voxtral-mini-tts-latest');
    // Le fichier a été réécrit sans les champs legacy.
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.ttsProvider).toBeUndefined();
    expect(onDisk.voices).toBeUndefined();
    expect(onDisk.ttsModel).toBe('voxtral-mini-tts-latest');
  });

  it('avec fichier existant merge avec les defauts', () => {
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({ models: { summary: 'custom-model' } }),
    );
    initConfig(tempDir);
    const cfg = getConfig();
    expect(cfg.models.summary).toBe('custom-model');
    expect(cfg.models.quiz).toBe('mistral-large-latest'); // defaut preserve
  });

  it('fichier JSON invalide: fallback in-memory DEFAULT + disque préservé + log error', () => {
    // Régression à prévenir : un config.json corrompu déclenchait auparavant
    // classify/migrate/writeFileSync sur DEFAULT_CONFIG et écrasait silencieusement
    // le fichier user (perte de config invisible). Le loadFailed gate doit préserver
    // le disque intact et émettre un logger.error explicite.
    const errSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    writeFileSync(join(tempDir, 'config.json'), '{invalid json');
    initConfig(tempDir);
    expect(getConfig().models.summary).toBe('mistral-large-latest'); // in-memory DEFAULT
    expect(getConfig().ttsModel).toBe('voxtral-mini-tts-latest');
    // Disque préservé (aucune réécriture par classify/migrate)
    expect(readFileSync(join(tempDir, 'config.json'), 'utf-8')).toBe('{invalid json');
    // logger.error émis avec le message "Failed to parse" + SyntaxError
    expect(errSpy).toHaveBeenCalledWith(
      'config',
      expect.stringContaining('Failed to parse'),
      expect.any(SyntaxError),
    );
  });

  it('fichier corrompu + saveConfig: .corrupt.bak créé avant overwrite, une seule fois', () => {
    // Après loadFailed, la prochaine action UI (saveConfig) doit backup le fichier
    // corrompu pour éviter la perte silencieuse du contenu user original.
    const corruptContent = '{invalid json but user data inside}';
    const configPath = join(tempDir, 'config.json');
    const backupPath = `${configPath}.corrupt.bak`;
    writeFileSync(configPath, corruptContent);
    vi.spyOn(logger, 'error').mockImplementation(() => {});
    initConfig(tempDir);
    // Avant saveConfig : aucun backup
    expect(existsSync(backupPath)).toBe(false);
    // 1er saveConfig : crée le backup + overwrite
    saveConfig({ ttsModel: 'voxtral-mini-tts-latest' });
    expect(existsSync(backupPath)).toBe(true);
    expect(readFileSync(backupPath, 'utf-8')).toBe(corruptContent);
    expect(JSON.parse(readFileSync(configPath, 'utf-8')).ttsModel).toBe('voxtral-mini-tts-latest');
    // 2e saveConfig : ne recrée pas un 2e backup (lastLoadFailed reset à false)
    writeFileSync(backupPath, 'this should NOT be overwritten');
    saveConfig({ ttsModel: 'other' });
    expect(readFileSync(backupPath, 'utf-8')).toBe('this should NOT be overwritten');
  });

  it('migration one-time: config.json sans mistralVoicesSource → classé default', () => {
    // Régression à prévenir : un user qui a un config.json pre-PR-20 (sans le champ)
    // ne doit PAS être classé 'user' (sinon la sélection dynamique par langue ne s'applique
    // jamais et le user reste coincé avec les voix FR même en EN/ES/etc.).
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({
        models: { summary: 'mistral-large-latest' },
        // mistralVoices absent → utilise DEFAULT_CONFIG.mistralVoices via spread.
      }),
    );
    initConfig(tempDir);
    expect(getConfig().mistralVoicesSource).toBe('default');
  });

  it('classification mistralVoicesSource sans champ legacy est persistée sur disque', () => {
    // Régression à prévenir : avant le fix, classifyMistralVoicesSource() modifiait
    // currentConfig en mémoire mais rien n'était écrit — re-classif à chaque boot.
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({ models: { summary: 'mistral-large-latest' } }),
    );
    initConfig(tempDir);
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.mistralVoicesSource).toBe('default');
  });

  it('migration one-time: config.json avec legacy default host → classé default', () => {
    // LEGACY_DEFAULT_HOSTS : un ancien ID default d'une release passée doit être détecté
    // comme "pas un choix utilisateur" pour que la migration fonctionne.
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({
        mistralVoices: {
          host: 'e3596645-b1af-469e-b857-f18ddedc7652', // LEGACY_DEFAULT_HOSTS
          guest: '5a271406-039d-46fe-835b-fbbb00eaf08d', // LEGACY_DEFAULT_GUESTS
        },
      }),
    );
    initConfig(tempDir);
    expect(getConfig().mistralVoicesSource).toBe('default');
  });

  it('migration one-time: config.json avec voix custom → classé user', () => {
    // Inverse du test précédent : un vrai choix utilisateur est préservé.
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({
        mistralVoices: {
          host: 'custom-host-id',
          guest: 'custom-guest-id',
        },
      }),
    );
    initConfig(tempDir);
    expect(getConfig().mistralVoicesSource).toBe('user');
  });

  it('migration partielle: voices seul legacy → removed, ttsModel intouché', () => {
    // Cas dégénéré mais possible : un config.json pré-removal avec `voices` legacy
    // mais un ttsModel déjà migré manuellement. La migration ne doit toucher que
    // ce qui a besoin de l'être.
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({
        voices: { host: { id: 'x', name: 'x' }, guest: { id: 'y', name: 'y' } },
        ttsModel: 'voxtral-mini-tts-latest',
      }),
    );
    initConfig(tempDir);
    const cfg = getConfig() as AppConfig & { voices?: unknown };
    expect(cfg.voices).toBeUndefined();
    expect(cfg.ttsModel).toBe('voxtral-mini-tts-latest');
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.voices).toBeUndefined();
  });

  it("migration partielle: ttsModel 'eleven_*' seul → reset, pas de ttsProvider/voices touché", () => {
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({
        ttsModel: 'eleven_multilingual_v2',
      }),
    );
    initConfig(tempDir);
    const cfg = getConfig() as AppConfig & { ttsProvider?: string; voices?: unknown };
    expect(cfg.ttsModel).toBe('voxtral-mini-tts-latest');
    expect(cfg.ttsProvider).toBeUndefined();
    expect(cfg.voices).toBeUndefined();
  });

  it('idempotent double-boot: aucune réécriture quand config est déjà migré+classifié', () => {
    // Régression à prévenir : si initConfig réécrit même quand rien n'a changé, on rotate
    // le mtime inutilement et on crée du bruit filesystem (backup systems, docker layers).
    // Pattern B content-check (FS-agnostic, pas dépendant de mtime sur ext3/FAT/tmpfs).
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({
        models: { summary: 'custom' },
        mistralVoicesSource: 'default',
      }),
    );
    initConfig(tempDir); // 1er boot : classify sera false (source déjà présente), migrate false → rien à écrire
    const content1 = readFileSync(join(tempDir, 'config.json'), 'utf-8');
    initConfig(tempDir); // 2e boot : toujours rien à faire
    const content2 = readFileSync(join(tempDir, 'config.json'), 'utf-8');
    expect(content2).toBe(content1);
  });

  it('shape hostile: saved.models = null → fallback DEFAULT sans crash', () => {
    // Protection contre config.json avec types invalides (corruption partielle, édition
    // manuelle erronée, downgrade schéma). Sans mergeSafe, `currentConfig.models.chat`
    // crasherait plus tard à l'appel.
    writeFileSync(join(tempDir, 'config.json'), JSON.stringify({ models: null }));
    initConfig(tempDir);
    expect(getConfig().models.chat).toBe('mistral-large-latest');
    expect(getConfig().models.summary).toBe('mistral-large-latest');
  });

  it('shape hostile: saved.models = string → fallback DEFAULT', () => {
    writeFileSync(join(tempDir, 'config.json'), JSON.stringify({ models: 'haxor' }));
    initConfig(tempDir);
    expect(getConfig().models.chat).toBe('mistral-large-latest');
  });

  it('shape hostile: saved.models = array → fallback DEFAULT', () => {
    // {...[]} produit {}, mais {...['a','b']} produit {0:'a', 1:'b'} qui casse l'accès .chat.
    // La garde !Array.isArray prévient les deux cas.
    writeFileSync(join(tempDir, 'config.json'), JSON.stringify({ models: ['a', 'b'] }));
    initConfig(tempDir);
    expect(getConfig().models.chat).toBe('mistral-large-latest');
  });

  it('shape hostile: saved = array au top-level → fallback DEFAULT', () => {
    writeFileSync(join(tempDir, 'config.json'), JSON.stringify([1, 2, 3]));
    initConfig(tempDir);
    expect(getConfig().ttsModel).toBe('voxtral-mini-tts-latest');
  });

  it('shape hostile: saved.mistralVoices = string → fallback DEFAULT', () => {
    writeFileSync(join(tempDir, 'config.json'), JSON.stringify({ mistralVoices: 'haxor' }));
    initConfig(tempDir);
    expect(getConfig().mistralVoices.host).toBeTruthy();
    expect(getConfig().mistralVoices.guest).toBeTruthy();
  });
});

describe('getConfig', () => {
  it('retourne la config courante apres init', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    expect(cfg).toHaveProperty('models');
    expect(cfg).toHaveProperty('mistralVoices');
    expect(cfg).toHaveProperty('ttsModel');
  });
});

describe('saveConfig', () => {
  it('merge partiel models et persiste sur disque', () => {
    initConfig(tempDir);
    saveConfig({ models: { summary: 'new-model' } as any });
    const cfg = getConfig();
    expect(cfg.models.summary).toBe('new-model');
    expect(cfg.models.quiz).toBe('mistral-large-latest'); // non ecrase

    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.models.summary).toBe('new-model');
  });

  it("preserve la source 'default' quand un save complet renvoie les memes mistralVoices", () => {
    initConfig(tempDir);
    const cfg = getConfig();
    expect(cfg.mistralVoicesSource).toBe('default');

    setVoiceCache([
      {
        id: asVoiceId('jane-curious'),
        name: 'Jane - Curious',
        languages: ['en_gb'],
        tags: ['curious'],
      },
      {
        id: asVoiceId('oliver-cheerful'),
        name: 'Oliver - Cheerful',
        languages: ['en_gb'],
        tags: ['cheerful'],
      },
    ]);

    saveConfig({
      models: { summary: 'new-model' } as any,
      mistralVoices: { ...cfg.mistralVoices },
    });

    const updated = getConfig();
    expect(updated.mistralVoicesSource).toBe('default');
    expect(resolveVoices(updated, undefined, 'en')).toEqual({
      host: 'jane-curious',
      guest: 'oliver-cheerful',
    });
    setVoiceCache([]);
  });

  it('accepte un override explicite via mistralVoicesSource meme si les IDs restent identiques', () => {
    initConfig(tempDir);
    const cfg = getConfig();

    saveConfig({
      mistralVoices: { ...cfg.mistralVoices },
      mistralVoicesSource: 'user',
    });

    expect(getConfig().mistralVoicesSource).toBe('user');
  });
});

describe('getApiStatus', () => {
  it('detecte MISTRAL_API_KEY presente', () => {
    vi.stubEnv('MISTRAL_API_KEY', 'test-key');
    const status = getApiStatus();
    expect(status.mistral).toBe(true);
    expect(status.ttsAvailable).toBe(true);
  });

  it('detecte MISTRAL_API_KEY absente', () => {
    vi.stubEnv('MISTRAL_API_KEY', '');
    const status = getApiStatus();
    expect(status.mistral).toBe(false);
    expect(status.ttsAvailable).toBe(false);
  });

  it('invariant: ttsAvailable === mistral (provider TTS unique)', () => {
    // Mistral Voxtral est l'unique provider TTS : ttsAvailable et mistral doivent
    // rester équivalents tant qu'aucun autre provider n'est réintroduit.
    vi.stubEnv('MISTRAL_API_KEY', 'test-key');
    const s1 = getApiStatus();
    expect(s1.ttsAvailable).toBe(s1.mistral);
    vi.stubEnv('MISTRAL_API_KEY', '');
    const s2 = getApiStatus();
    expect(s2.ttsAvailable).toBe(s2.mistral);
  });

  it('voiceCacheReady reflète le succès du warmup listVoices', () => {
    // Au boot avant warmup : voiceCacheReady=false (warmup async non terminé ou en erreur).
    // Après setVoiceCache avec voix : true. Avec voix vides : false (la sélection dynamique
    // par langue retombe sur DEFAULT_CONFIG).
    setVoiceCache([]);
    expect(getApiStatus().voiceCacheReady).toBe(false);
    setVoiceCache([{ id: asVoiceId('v1'), name: 'V1', languages: ['fr_FR'] }]);
    expect(getApiStatus().voiceCacheReady).toBe(true);
    setVoiceCache([]);
    expect(getApiStatus().voiceCacheReady).toBe(false);
  });
});

describe('resetConfig', () => {
  it('remet les valeurs par defaut et persiste', () => {
    initConfig(tempDir);
    saveConfig({ models: { summary: 'custom' } as any });
    const reset = resetConfig();
    expect(reset.models.summary).toBe('mistral-large-latest');
    // Check persisted on disk
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.models.summary).toBe('mistral-large-latest');
  });
});

describe('resolveVoices', () => {
  it('retourne les mistralVoices de la config par défaut (tier 2 global config)', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    const voices = resolveVoices(cfg);
    expect(voices).toEqual(cfg.mistralVoices);
  });

  it('tier 1: retourne les voix du profil si definies', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    const profileVoices = {
      host: asVoiceId('profile-host-id'),
      guest: asVoiceId('profile-guest-id'),
    };
    expect(resolveVoices(cfg, profileVoices, 'fr')).toEqual(profileVoices);
  });

  it('tier 2: retourne config globale si settings utilisateur explicites (mistralVoicesSource=user)', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.mistralVoicesSource = 'user';
    setVoiceCache([
      {
        id: asVoiceId('marie-excited'),
        name: 'Marie - Excited',
        languages: ['fr_fr'],
        tags: ['excited'],
      },
      {
        id: asVoiceId('marie-curious'),
        name: 'Marie - Curious',
        languages: ['fr_fr'],
        tags: ['curious'],
      },
    ]);
    const voices = resolveVoices(cfg, undefined, 'fr');
    expect(voices).toEqual(cfg.mistralVoices);
    setVoiceCache([]); // cleanup
  });

  it('tier 2: retourne config globale meme si cache EN rempli', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    setVoiceCache([
      {
        id: asVoiceId('jane-curious'),
        name: 'Jane - Curious',
        languages: ['en_gb'],
        tags: ['curious'],
      },
      {
        id: asVoiceId('oliver-cheerful'),
        name: 'Oliver - Cheerful',
        languages: ['en_gb'],
        tags: ['cheerful'],
      },
    ]);
    const voices = resolveVoices(cfg, undefined, 'en');
    expect(voices).toEqual({ host: 'jane-curious', guest: 'oliver-cheerful' });
    setVoiceCache([]); // cleanup
  });

  it('preserve config globale custom pour EN si mistralVoicesSource=user', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.mistralVoices = { host: asVoiceId('custom-host'), guest: asVoiceId('custom-guest') };
    cfg.mistralVoicesSource = 'user';
    setVoiceCache([
      {
        id: asVoiceId('jane-curious'),
        name: 'Jane - Curious',
        languages: ['en_gb'],
        tags: ['curious'],
      },
      {
        id: asVoiceId('oliver-cheerful'),
        name: 'Oliver - Cheerful',
        languages: ['en_gb'],
        tags: ['cheerful'],
      },
    ]);
    const voices = resolveVoices(cfg, undefined, 'en');
    expect(voices).toEqual({ host: 'custom-host', guest: 'custom-guest' });
    setVoiceCache([]); // cleanup
  });

  it('tier 3: fallback langue si config globale vide et cache rempli', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.mistralVoices = { host: asVoiceId(''), guest: asVoiceId('') };
    setVoiceCache([
      {
        id: asVoiceId('marie-excited'),
        name: 'Marie - Excited',
        languages: ['fr_fr'],
        tags: ['excited'],
      },
      {
        id: asVoiceId('marie-curious'),
        name: 'Marie - Curious',
        languages: ['fr_fr'],
        tags: ['curious'],
      },
    ]);
    const voices = resolveVoices(cfg, undefined, 'fr');
    expect(voices).toEqual({ host: 'marie-excited', guest: 'marie-curious' });
    setVoiceCache([]); // cleanup
  });

  it('tier 3: fallback config globale si cache vide', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    setVoiceCache([]);
    const voices = resolveVoices(cfg, undefined, 'fr');
    expect(voices).toEqual(cfg.mistralVoices);
  });

  it('merge voix profil partielles (host seul → host custom + guest default)', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    setVoiceCache([]);
    const partial = { host: asVoiceId('only-host'), guest: asVoiceId('') };
    const voices = resolveVoices(cfg, partial, 'fr');
    expect(voices).toEqual({ host: 'only-host', guest: cfg.mistralVoices.guest });
  });

  it('merge voix profil partielles (guest seul → host default + guest custom)', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    setVoiceCache([]);
    const partial = { host: asVoiceId(''), guest: asVoiceId('only-guest') };
    const voices = resolveVoices(cfg, partial, 'fr');
    expect(voices).toEqual({ host: cfg.mistralVoices.host, guest: 'only-guest' });
  });

  it('migration path: legacy default host reste traité comme default pour EN', () => {
    // Ancien default pré-cette-PR. Un user qui upgrade avec ce host dans son config.json
    // doit quand même récupérer Jane en EN, pas conserver l'ancienne Marie FR.
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.mistralVoices = {
      host: asVoiceId('e3596645-b1af-469e-b857-f18ddedc7652'),
      guest: cfg.mistralVoices.guest,
    };
    setVoiceCache([
      {
        id: asVoiceId('jane-curious'),
        name: 'Jane - Curious',
        languages: ['en_gb'],
        tags: ['curious'],
      },
      {
        id: asVoiceId('oliver-cheerful'),
        name: 'Oliver - Cheerful',
        languages: ['en_gb'],
        tags: ['cheerful'],
      },
    ]);
    const voices = resolveVoices(cfg, undefined, 'en');
    expect(voices.host).toBe('jane-curious');
    setVoiceCache([]);
  });

  it('migration path: legacy default guest reste traité comme default pour EN', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.mistralVoices = {
      host: cfg.mistralVoices.host,
      guest: asVoiceId('5a271406-039d-46fe-835b-fbbb00eaf08d'),
    };
    setVoiceCache([
      {
        id: asVoiceId('jane-curious'),
        name: 'Jane - Curious',
        languages: ['en_gb'],
        tags: ['curious'],
      },
      {
        id: asVoiceId('oliver-cheerful'),
        name: 'Oliver - Cheerful',
        languages: ['en_gb'],
        tags: ['cheerful'],
      },
    ]);
    const voices = resolveVoices(cfg, undefined, 'en');
    expect(voices.guest).toBe('oliver-cheerful');
    setVoiceCache([]);
  });

  it('profile voices overrident les defaults même avec lang EN et cache rempli', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    setVoiceCache([
      {
        id: asVoiceId('jane-curious'),
        name: 'Jane - Curious',
        languages: ['en_gb'],
        tags: ['curious'],
      },
      {
        id: asVoiceId('oliver-cheerful'),
        name: 'Oliver - Cheerful',
        languages: ['en_gb'],
        tags: ['cheerful'],
      },
    ]);
    const voices = resolveVoices(
      cfg,
      { host: asVoiceId('custom-h'), guest: asVoiceId('custom-g') },
      'en',
    );
    expect(voices).toEqual({ host: 'custom-h', guest: 'custom-g' });
    setVoiceCache([]);
  });

  it('combine override partiel utilisateur (mistralVoicesSource=user) + fallback langue pour champ restant', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    const defaultGuest = cfg.mistralVoices.guest;
    cfg.mistralVoices = { host: asVoiceId('custom-host'), guest: defaultGuest };
    cfg.mistralVoicesSource = 'user';
    setVoiceCache([
      {
        id: asVoiceId('jane-curious'),
        name: 'Jane - Curious',
        languages: ['en_gb'],
        tags: ['curious'],
      },
      {
        id: asVoiceId('oliver-cheerful'),
        name: 'Oliver - Cheerful',
        languages: ['en_gb'],
        tags: ['cheerful'],
      },
    ]);
    const voices = resolveVoices(cfg, undefined, 'en');
    // Avec source=user, l'override global 'custom-host' est respecté.
    // Pour le guest, la valeur globale = defaultGuest (ancien default) est aussi respectée par
    // priorité 2, donc on n'atteint pas la selection dynamique. Comportement nouveau et
    // explicite : mistralVoicesSource=user signifie 'je pilote moi-même host ET guest'.
    expect(voices).toEqual({ host: 'custom-host', guest: defaultGuest });
    setVoiceCache([]); // cleanup
  });
});

describe('saveConfig (additional fields)', () => {
  it('persiste ttsModel', () => {
    initConfig(tempDir);
    saveConfig({ ttsModel: 'custom-tts-model' });
    const cfg = getConfig();
    expect(cfg.ttsModel).toBe('custom-tts-model');
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.ttsModel).toBe('custom-tts-model');
  });

  it('merge partiel mistralVoices', () => {
    initConfig(tempDir);
    saveConfig({ mistralVoices: { host: 'new-host-voice' } as any });
    const cfg = getConfig();
    expect(cfg.mistralVoices.host).toBe('new-host-voice');
    expect(cfg.mistralVoices.guest).toBeTruthy(); // guest preserve
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.mistralVoices.host).toBe('new-host-voice');
  });

  it("rejette ttsModel legacy 'eleven_*' POST et preserve la valeur courante", () => {
    // Une UI pré-PR ou client automatisé peut POSTer encore 'eleven_*' entre 2 restarts.
    // saveConfig doit IGNORER la valeur legacy (pas reset aggressif vers DEFAULT) et preserver
    // le choix utilisateur courant (deja non-legacy apres le boot migration).
    initConfig(tempDir);
    saveConfig({ ttsModel: 'voxtral-custom' });
    expect(getConfig().ttsModel).toBe('voxtral-custom');
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    saveConfig({ ttsModel: 'eleven_v3' });
    expect(getConfig().ttsModel).toBe('voxtral-custom'); // preserve, pas ecrase
    expect(warnSpy).toHaveBeenCalledWith(
      'config',
      expect.stringContaining("rejected legacy ttsModel 'eleven_v3'"),
    );
  });
});
