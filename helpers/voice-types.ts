// Types purs pour les voix Mistral, sans dépendance runtime aux SDKs.
// Extrait pour pouvoir être importé côté frontend via l'alias @helpers
// sans embarquer @mistralai/mistralai.

export interface MistralVoice {
  id: string;
  name: string;
  languages: string[];
  gender?: string;
  tags?: string[];
  createdAt?: string;
}
