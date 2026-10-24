/**
 * Source de vérité unique pour les modèles de synthèse vocale (TTS) Mistral sélectionnables
 * (`config.ttsModel` : podcast, quiz vocal, dictée, lecture à voix haute).
 * Importable backend (`../helpers/tts-models.js`) ET frontend (`@helpers/tts-models`).
 */
import type { MistralVoice } from './voice-types.js';

/** Voxtral TTS (mars 2026) : défaut épinglé ET seul modèle « speech v1 » proposé. */
const VOXTRAL_TTS_2603 = 'voxtral-mini-tts-2603';

/** Modèles proposés. Ordre = ordre d'affichage du sélecteur ; le défaut en tête. */
export const TTS_MODELS = [VOXTRAL_TTS_2603, 'voxtral-mini-tts-3-0'] as const;

export type TtsModel = (typeof TTS_MODELS)[number];

/**
 * Noms produit affichés à l'UI (table « Audio » de docs.mistral.ai/models). La valeur stockée en
 * config et envoyée à l'API reste l'id technique (clé de cet objet) — ne jamais persister le label.
 */
export const TTS_MODEL_LABELS: Record<TtsModel, string> = {
  'voxtral-mini-tts-2603': 'Voxtral TTS',
  'voxtral-mini-tts-3-0': 'Voxtral TTS 3',
};

/**
 * Modèles en « Public Preview » chez Mistral (fiche du 2026-10-20) : proposés en option, signalés
 * « préversion » dans le sélecteur, jamais par défaut tant qu'ils ne sont pas GA.
 */
export const TTS_PREVIEW_MODELS: ReadonlySet<TtsModel> = new Set<TtsModel>([
  'voxtral-mini-tts-3-0',
]);

/**
 * Défaut **Voxtral TTS** (`voxtral-mini-tts-2603`, 16 $/M caractères), le modèle que servait l'alias
 * `voxtral-mini-tts-latest`, défaut jusqu'en v1.7.11 (résolution mesurée sur `/v1/models` le
 * 2026-10-21). Épinglé : le guide de migration de Mistral annonce que `voxtral-mini-tts-latest`
 * « will point to Voxtral 3 within a month of GA » ; sans épinglage, le modèle (donc la voix et les
 * voix acceptées) ET le tarif auraient changé en silence (le préfixe `voxtral-mini-tts` garde 16 $).
 * Un `voxtral-mini-tts-latest` persisté dans config.json est ramené sur ce défaut au démarrage.
 *
 * Voxtral TTS 3 (`voxtral-mini-tts-3-0`, 13 $/M caractères, voix natives dans plus de langues) est
 * en Public Preview : option seulement. Mesure du 2026-10-21 (critères écrits avant,
 * `output/voxtral3-corpus/2026-10-21/`) : il accepte les 68 voix du catalogue, voix de l'app dans les
 * 9 langues comprises, aucun audio vide, intelligibilité aller-retour égale à 2603 ; MAIS il prononce
 * moins bien les mots isolés de la dictée (32/48 contre 40/48 ; « siècle » raté 6 fois sur 6) et perd
 * parfois une lettre seule en fin de phrase (« …réponse B. » sans le B, 3 fois sur 12) ; une seule
 * voix native en es, pt, it, nl, de, ar (le podcast y joue les deux rôles avec la même voix). La
 * naturalité ne se mesure qu'à l'écoute : passer TTS 3 par défaut exige le statut GA, une nouvelle
 * mesure de la dictée et l'écoute du propriétaire (échantillons à l'aveugle dans
 * `output/voxtral3-corpus/2026-10-21/echantillons/`).
 */
export const DEFAULT_TTS_MODEL: TtsModel = VOXTRAL_TTS_2603;

export const isTtsModel = (v: unknown): v is TtsModel =>
  typeof v === 'string' && (TTS_MODELS as readonly string[]).includes(v);

/**
 * Normalise une valeur de modèle TTS (config disque, payload client) vers un `TtsModel` valide.
 * L'alias `voxtral-mini-tts-latest`, un id ElevenLabs legacy (`eleven_*`) comme toute valeur inconnue
 * ou absente retombent sur le défaut épinglé.
 */
export function normalizeTtsModel(v: unknown): TtsModel {
  return isTtsModel(v) ? v : DEFAULT_TTS_MODEL;
}

/**
 * Modèles « speech v1 » : ils n'acceptent que les voix de clonage instantané (`kind: ivc` dans
 * l'API). Mesuré le 2026-10-21 : `voxtral-mini-tts-2603` refuse une voix `pvc` (preset Voxtral 3)
 * en HTTP 400, code 3051, « voice is not supported for speech v1 », alors que le catalogue
 * `/v1/audio/voices` en renvoie 36 depuis le 2026-10-20 (seules voix es, pt, it, nl, de, hi, ar).
 * `voxtral-mini-tts-3-0` accepte les deux sortes de voix.
 */
const SPEECH_V1_MODELS: ReadonlySet<TtsModel> = new Set<TtsModel>([VOXTRAL_TTS_2603]);

/** Slug des presets Voxtral 2, tous `ivc` : `fr_marie_neutral`, `gb_jane_sad`, `en_paul_happy`. */
const SPEECH_V1_PRESET_SLUG = /^[a-z]{2}_[a-z]+_[a-z]+$/;

/**
 * Vrai si le modèle accepte la voix. Les modèles speech v1 n'acceptent que `kind: 'ivc'`, champ que
 * le SDK expose depuis la 3.0 ; toute autre valeur est écartée. Sans `kind`, repli sur la
 * reconnaissance d'avant le SDK 3 : slug de preset Voxtral 2 ou voix personnelle (voix clonée par
 * le compte, `userId` non nul : clonage instantané), vérifiée le 2026-10-21 contre le `kind` brut
 * des 68 voix du catalogue (0 écart). Prédicat POSITIF : une voix d'une forme inconnue est écartée
 * des modèles speech v1 (repli sur une autre voix) plutôt qu'envoyée vers un 400.
 */
export const voiceSupportsTtsModel = (
  voice: Pick<MistralVoice, 'slug' | 'custom' | 'kind'>,
  model: TtsModel,
): boolean => {
  if (!SPEECH_V1_MODELS.has(model)) return true;
  if (voice.kind !== undefined) return voice.kind === 'ivc';
  return voice.custom === true || SPEECH_V1_PRESET_SLUG.test(voice.slug ?? '');
};

/** Voix du catalogue que le modèle accepte (liste des Réglages, voix candidates d'un appel). */
export const voicesForTtsModel = <V extends Pick<MistralVoice, 'slug' | 'custom' | 'kind'>>(
  voices: readonly V[],
  model: TtsModel,
): V[] => voices.filter((v) => voiceSupportsTtsModel(v, model));
