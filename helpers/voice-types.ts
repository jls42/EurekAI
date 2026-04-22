// Types purs pour les voix Mistral, sans dépendance runtime aux SDKs.
// Extrait pour pouvoir être importé côté frontend via l'alias @helpers
// sans embarquer @mistralai/mistralai.

/**
 * Branded type pour les voice IDs Mistral.
 * Empêche de passer une string arbitraire (ex: texte à synthétiser) là où un
 * voice ID est attendu. Cast requis aux boundaries : API response, config load,
 * user input. Toujours faire `asVoiceId(s)` au lieu de `s as VoiceId` pour
 * garder un point d'entrée unique traçable.
 */
export type VoiceId = string & { readonly __brand: 'VoiceId' };

export const asVoiceId = (s: string): VoiceId => s as VoiceId;

export interface MistralVoice {
  id: VoiceId;
  name: string;
  languages: string[];
  gender?: string;
  tags?: string[];
  createdAt?: string;
}
