/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy lance ESLint sans resolution de types : resolvePricing() est error-typé et le param type-only de TranslateFn est vu unused (faux positifs) ; couvert par lint:ci local type-aware */
import { resolvePricing } from '@helpers/pricing';

/** Fonction de traduction minimale (clé → texte). Compatible avec le `t` d'AppContext. */
type TranslateFn = (key: string) => string;

/**
 * Libellé tarifaire lisible pour un modèle, dérivé de `MODEL_PRICING` (source de vérité unique).
 * Seul le suffixe d'unité est traduit ; les montants viennent du pricing → zéro duplication de
 * prix dans l'i18n. `toFixed(2)` sur les tokens aligne l'affichage ($0.50 / $1.50).
 */
export function modelPriceLabel(modelId: string, t: TranslateFn): string {
  const pricing = resolvePricing(modelId);
  if (!pricing) return t('settings.priceUnknown');
  switch (pricing.unit) {
    case 'tokens':
      return `$${pricing.inputPerMillion.toFixed(2)} / $${pricing.outputPerMillion.toFixed(2)} ${t('settings.perMTokens')}`;
    case 'pages':
      return `$${pricing.inputPerMillion / 1000} ${t('settings.perKPages')}`;
    case 'characters':
      return `$${pricing.inputPerMillion} ${t('settings.perMChars')}`;
    case 'audio-seconds':
      // STT (voxtral-mini) n'est exposé dans aucun sélecteur Réglages → pas de libellé tarifaire.
      // S'il l'était un jour, ajouter une clé i18n dédiée plutôt que retomber sur priceUnknown.
      return t('settings.priceUnknown');
    default: {
      // Exhaustivité compile-time : une nouvelle BillingUnit casse ce `never` et force
      // un case explicite — évite un "tarif indisponible" silencieux sur un modèle pourtant tarifé.
      const _exhaustive: never = pricing.unit;
      return _exhaustive;
    }
  }
}
