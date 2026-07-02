/* eslint-disable
   @typescript-eslint/no-misused-promises,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-return
   --
   Codacy lance ESLint avec un typage Alpine/fetch/imports incomplet; lint:ci local reste type-aware. */
import { clearProfileLocale, getProfileLocale, setProfileLocale } from './profile-locale';
import { clearProfileApiKey } from './api-key';
import { normalizeReadingComfort, READING_COMFORT_LIMITS } from '@helpers/reading-comfort';
import type { AppContext } from './app-context';
import type { Profile } from '../../types';
import type { CreateProfileBody } from '../../routes/profiles';

type EditingProfile = Profile & { _verifiedPin?: string; hasPin?: boolean };

// Helper de fallback : `??` pèse 2 en CCN Lizard (cf. CLAUDE.md) → un seul `??`
// par helper, accès aux limites par objet littéral (pas d'indexation dynamique,
// faux positif « Object Injection Sink » côté Codacy sinon).
const comfortValue = (value: number | undefined, limit: { default: number }): number =>
  value ?? limit.default;

// Shape complet pour les x-model du panneau confort (sliders + select police) :
// chaque champ reçoit sa valeur effective ou le défaut des limites partagées.
const toEditingReadingComfort = (comfort: Profile['readingComfort']) => {
  const c = comfort ?? {};
  return {
    font: c.font ?? 'default',
    letterSpacing: comfortValue(c.letterSpacing, READING_COMFORT_LIMITS.letterSpacing),
    wordSpacing: comfortValue(c.wordSpacing, READING_COMFORT_LIMITS.wordSpacing),
    lineHeight: comfortValue(c.lineHeight, READING_COMFORT_LIMITS.lineHeight),
  };
};
type MistralVoicesPartial = { host?: string; guest?: string } | null | undefined;

const LS_PROFILE_ID = 'sf-profileId';
const TOAST_ERROR = 'toast.error';

// Codes stables FailedStepCode + erreurs profiles connues pour lesquels on a une
// traduction i18n via `errorCode.<code>`. Tout autre code retourne le code brut
// (mieux que rien — debug-friendly pour l'admin, mais pas user-friendly).
// Ajout d'un code = clé `errorCode.<code>` dans les 9 fichiers i18n.
// Cf. CLAUDE.md "Codes d'erreur API".
const I18N_KNOWN_ERROR_CODES = new Set([
  'internal_error',
  'no_sources',
  'auth_required',
  'quota_exceeded',
  'upstream_unavailable',
  'tts_upstream_error',
  'context_length_exceeded',
  'llm_invalid_json',
  'profile_delete_partial',
]);

export function mapServerErrorCode(state: AppContext, raw: unknown): string {
  if (typeof raw !== 'string' || !raw) return '';
  return I18N_KNOWN_ERROR_CODES.has(raw) ? state.t('errorCode.' + raw) : raw;
}

export function buildDeleteOpts(pin?: string): RequestInit {
  const opts: RequestInit = { method: 'DELETE' };
  if (pin) {
    opts.headers = { 'Content-Type': 'application/json' };
    opts.body = JSON.stringify({ pin });
  }
  return opts;
}

export function finalizeDeleteProfile(state: AppContext, id: string): void {
  clearProfileLocale(id);
  clearProfileApiKey(id); // purge la clé Mistral locale du profil supprimé
  state.profiles = state.profiles.filter((p: Profile) => p.id !== id);
  if (state.currentProfile?.id === id) {
    state.currentProfile = null;
    localStorage.removeItem(LS_PROFILE_ID);
    if (state.profiles.length > 0) {
      void state.selectProfile(state.profiles[0].id);
    } else {
      state.showProfilePicker = true;
    }
  }
  state.showToast(state.t('toast.profileDeleted'), 'success');
}

export async function executeDeleteProfile(
  state: AppContext,
  id: string,
  pin?: string,
): Promise<void> {
  try {
    // fetch inline (pas extrait dans un helper, pas de constante top-fichier pour le préfixe)
    // pour préserver l'analyse taint Codacy : `rule-node-ssrf` a besoin de voir l'URL littérale
    // `/api/profiles/` dans la fonction qui appelle `fetch` — cf. CLAUDE.md section Sécurité.
    // eslint-disable-next-line sonarjs/no-duplicate-string -- required: SSRF taint analysis needs literal inline
    const res = await fetch('/api/profiles/' + id, buildDeleteOpts(pin));
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      state.showToast(
        state.t(TOAST_ERROR, { error: mapServerErrorCode(state, err.error) || res.statusText }),
        'error',
      );
      return;
    }
    finalizeDeleteProfile(state, id);
  } catch (e: unknown) {
    console.error('Failed to delete profile:', e);
    const msg = e instanceof Error ? e.message : String(e);
    state.showToast(state.t(TOAST_ERROR, { error: msg }), 'error');
  }
}

export function deleteConfirmMessage(state: AppContext, id: string): string {
  const projectCount = state.currentProfile?.id === id ? state.projects.length : 0;
  return projectCount > 0
    ? state.t('profile.deleteConfirm', { count: projectCount })
    : state.t('profile.deleteConfirmNoProjects');
}

export function isProfileFormValid(p: EditingProfile | null | undefined): boolean {
  return !!p?.name?.trim() && !!p.age && p.age >= 4 && p.age <= 120;
}

export function buildVoicesUpdate(
  mistralVoices: MistralVoicesPartial,
): { host?: string; guest?: string } | null {
  if (!mistralVoices?.host && !mistralVoices?.guest) return null;
  const voices: { host?: string; guest?: string } = {};
  if (mistralVoices.host) voices.host = mistralVoices.host;
  if (mistralVoices.guest) voices.guest = mistralVoices.guest;
  return voices;
}

type ValidationResult = 'ok' | 'invalid' | 'pin_mismatch';
type NewProfileFormState = { result: ValidationResult; name: string; age: number };

export function isValidNameAge(name: string, age: number): boolean {
  return !!name && !!age && age >= 4 && age <= 120;
}

export function checkMinorPin(state: AppContext): ValidationResult {
  if (!/^\d{4}$/.test(state.newProfilePin)) return 'invalid';
  if (state.newProfilePin !== state.newProfilePinConfirm) return 'pin_mismatch';
  return 'ok';
}

export function validateNewProfileForm(state: AppContext): NewProfileFormState {
  const name = state.newProfileName.trim();
  const age = Number(state.newProfileAge);
  if (!isValidNameAge(name, age)) return { result: 'invalid', name, age };
  if (age < 15) return { result: checkMinorPin(state), name, age };
  return { result: 'ok', name, age };
}

export function buildCreateProfileBody(
  state: AppContext,
  name: string,
  age: number,
): CreateProfileBody {
  const body: CreateProfileBody = {
    name,
    age,
    avatar: state.newProfileAvatar,
    locale: state.newProfileLocale,
  };
  if (age < 15) body.pin = state.newProfilePin;
  return body;
}

export function applyCreateProfileSuccess(state: AppContext, profile: Profile): void {
  state.profiles.push(profile);
  void state.selectProfile(profile.id);
  state.newProfileName = '';
  state.newProfileAge = '';
  state.newProfileAvatar = '0';
  state.newProfileLocale = 'fr';
  state.newProfilePin = '';
  state.newProfilePinConfirm = '';
  state.showProfileForm = false;
}

export function buildProfileUpdates(editingProfile: EditingProfile): Record<string, unknown> {
  const {
    name,
    age,
    avatar,
    locale,
    mistralVoices,
    theme,
    readingComfort,
    _verifiedPin,
    updatedAt,
  } = editingProfile;
  const updates: Record<string, unknown> = {
    name: name.trim(),
    age,
    avatar,
    locale,
    mistralVoices: buildVoicesUpdate(mistralVoices),
    theme: theme || null,
    // null = reset explicite côté serveur quand tout est revenu au défaut.
    readingComfort: normalizeReadingComfort(readingComfort) ?? null,
    _updatedAt: updatedAt,
  };
  if (_verifiedPin) updates.pin = _verifiedPin;
  return updates;
}

// Surface les drops silencieux (rows malformées ou migration failed côté serveur) —
// sans ce signal, l'user voit un picker partiel et invente un profil au-dessus
// de ses anciennes données. Toast warning, pas erreur : le picker est utilisable.
const surfaceProfilesDropHeader = (state: AppContext, res: Response): void => {
  const droppedRaw = res.headers.get('X-Profiles-Dropped');
  const dropped = droppedRaw ? Number.parseInt(droppedRaw, 10) : 0;
  if (Number.isFinite(dropped) && dropped > 0) {
    state.showToast(state.t('toast.profilesPartial', { count: dropped }), 'warning');
  }
};

const reportFetchProfilesError = async (state: AppContext, res: Response): Promise<void> => {
  const err = await res.json().catch(() => ({}));
  console.error('Failed to load profiles:', res.status, err);
  state.showToast(
    state.t(TOAST_ERROR, { error: mapServerErrorCode(state, err.error) || res.statusText }),
    'error',
  );
};

// Sépare le fetch + handling erreur du flow de sélection de profil pour rester sous
// CCN 8 dans loadProfiles. Surface les erreurs serveur (500 sur ENOSPC/EACCES côté
// ProfileStore) via toast — sinon l'user voit un picker vide et invente un nouveau
// profil au-dessus de ses données existantes.
const fetchProfilesInto = async function (state: AppContext): Promise<void> {
  try {
    const res = await fetch('/api/profiles');
    if (res.ok) {
      state.profiles = await res.json();
      surfaceProfilesDropHeader(state, res);
      return;
    }
    await reportFetchProfilesError(state, res);
  } catch (e: unknown) {
    console.error('Failed to load profiles:', e);
    const msg = e instanceof Error ? e.message : String(e);
    state.showToast(state.t(TOAST_ERROR, { error: msg }), 'error');
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Méthodes extraites de createProfiles : éviter l'agglomération Lizard CCN.
// `const x = function(this: AppContext, ...) {...}` plutôt que `function x(...)`
// car le parseur TS Lizard agglomère les `function name(this: T, ...)` consécutifs.
// ─────────────────────────────────────────────────────────────────────────────

const loadProfiles = async function (this: AppContext) {
  await fetchProfilesInto(this);
  // Restore last selected profile. await : selectProfile charge la clé Mistral (async)
  // qui doit être prête avant loadConfig (boot) → loadMistralVoices.
  const saved = localStorage.getItem(LS_PROFILE_ID);
  if (saved && this.profiles.some((p: Profile) => p.id === saved)) {
    await this.selectProfile(saved);
  } else if (this.profiles.length > 0) {
    await this.selectProfile(this.profiles[0].id);
  } else {
    this.showProfilePicker = true;
  }
};

// Applique (ou retire) les variables CSS de confort de lecture sur :root.
// Les défauts vivent dans theme.css — retirer la propriété = rendu actuel.
// Normalisation par le MÊME helper que le serveur (clamp identique, cf.
// helpers/reading-comfort.ts) : l'aperçu live ne peut pas montrer une valeur
// que la persistance refuserait.
const applyReadingComfortVars = function (comfort: unknown): void {
  const root = document.documentElement.style;
  const c = normalizeReadingComfort(comfort);
  if (c?.font === 'luciole') {
    root.setProperty('--reading-font', "'Luciole', 'Manrope', sans-serif");
  } else {
    root.removeProperty('--reading-font');
  }
  setOrRemoveVar(root, '--reading-letter-spacing', c?.letterSpacing, 'em');
  setOrRemoveVar(root, '--reading-word-spacing', c?.wordSpacing, 'em');
  setOrRemoveVar(root, '--reading-line-height', c?.lineHeight, '');
};

const setOrRemoveVar = (
  root: CSSStyleDeclaration,
  name: string,
  value: number | undefined,
  unit: string,
): void => {
  if (value === undefined) root.removeProperty(name);
  else root.setProperty(name, `${value}${unit}`);
};

const applyProfileTheme = function (state: AppContext, profile: Profile): void {
  if (profile.theme) {
    state.theme = profile.theme;
    document.documentElement.dataset.theme = profile.theme;
    return;
  }
  const stored = localStorage.getItem('sf-theme');
  const system = globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  state.theme = stored || system;
  document.documentElement.dataset.theme = state.theme;
};

const selectProfile = async function (this: AppContext, id: string) {
  const profile = this.profiles.find((p: Profile) => p.id === id);
  if (!profile) return;
  this.currentProfile = profile;
  this.showProfilePicker = false;
  localStorage.setItem(LS_PROFILE_ID, id);
  this.setLocale(getProfileLocale(id, profile.locale || 'fr'), true);
  applyProfileTheme(this, profile);
  applyReadingComfortVars(profile.readingComfort);
  // Reset project state (synchrone) for this profile.
  // resetSession() abort les fetches en vol et vide loading/toasts/pendings :
  // empêche un toast `generationDone` du profil précédent d'apparaître ici.
  this.currentProjectId = null;
  this.currentProject = null;
  this.resetSession();
  this.resetState();
  // Charge la clé Mistral du profil AVANT loadProjects (déchiffrement IndexedDB async,
  // doit être résolu avant les fetchs IA). Reste après les resets synchrones.
  await this.refreshKeyState(id);
  this.loadProjects();
};

const createProfile = async function (this: AppContext) {
  const { result, name, age } = validateNewProfileForm(this);
  if (result === 'pin_mismatch') {
    this.showToast(this.t('profile.pinMismatch'), 'error');
    return;
  }
  if (result !== 'ok') return;
  try {
    const res = await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildCreateProfileBody(this, name, age)),
    });
    if (res.ok) {
      applyCreateProfileSuccess(this, await res.json());
    } else {
      const err = await res.json().catch(() => ({}));
      this.showToast(
        this.t(TOAST_ERROR, { error: mapServerErrorCode(this, err.error) || res.statusText }),
        'error',
      );
    }
  } catch (e: unknown) {
    console.error('Failed to create profile:', e);
    const msg = e instanceof Error ? e.message : String(e);
    this.showToast(this.t(TOAST_ERROR, { error: msg }), 'error');
  }
};

const deleteProfile = async function (this: AppContext, id: string) {
  const profile = this.profiles.find((p: Profile) => p.id === id);
  if (!profile) return;
  const target = deleteConfirmMessage(this, id);
  if (profile.hasPin) {
    this.requirePin(async (pin: string) => {
      this.confirmDelete(target, () => executeDeleteProfile(this, id, pin));
    });
    return;
  }
  this.confirmDelete(target, () => executeDeleteProfile(this, id));
};

const applyProfileUpdate = function (this: AppContext, id: string, updated: Profile) {
  const idx = this.profiles.findIndex((p: Profile) => p.id === id);
  if (idx !== -1) this.profiles[idx] = updated;
  if (this.currentProfile?.id === id) this.currentProfile = updated;
  if (this.editingProfile?.id === id) {
    if (updated.updatedAt) this.editingProfile.updatedAt = updated.updatedAt;
    if (updated.ageGroup) this.editingProfile.ageGroup = updated.ageGroup;
  }
  if (updated.locale) setProfileLocale(id, updated.locale);
};

// Sous-helper extrait d'updateProfile pour le branchement sur res.ok / abort.
const handleUpdateProfileResponse = async (
  state: AppContext,
  id: string,
  res: Response,
  signal?: AbortSignal,
): Promise<void> => {
  if (signal?.aborted) return;
  if (res.ok) {
    state.applyProfileUpdate(id, await res.json());
    return;
  }
  const err = await res.json().catch(() => ({}));
  // Toujours surfacer un toast — sans ce fallback un 5xx avec body HTML, un 413
  // payload-too-large, ou un parse fail produirait silence total côté UI alors
  // que l'état serveur diverge.
  console.error('Failed to update profile:', res.status, err);
  state.showToast(
    state.t(TOAST_ERROR, { error: mapServerErrorCode(state, err.error) || res.statusText }),
    'error',
  );
};

const updateProfile = async function (
  this: AppContext,
  id: string,
  updates: Record<string, unknown>,
  signal?: AbortSignal,
) {
  try {
    // SSRF: literal `/api/profiles/` inline pour préserver l'analyse taint Codacy
    // (cf. executeDeleteProfile + CLAUDE.md section Sécurité).
    const res = await fetch('/api/profiles/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
      signal,
    });
    await handleUpdateProfileResponse(this, id, res, signal);
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'AbortError') return;
    console.error('Failed to update profile:', e);
    const msg = e instanceof Error ? e.message : String(e);
    this.showToast(this.t(TOAST_ERROR, { error: msg }), 'error');
  }
};

const startEditProfile = function (this: AppContext, id: string) {
  const profile = this.profiles.find((p: Profile) => p.id === id);
  if (!profile) return;
  this.editingProfile = {
    ...profile,
    locale: profile.locale || 'fr',
    mistralVoices: {
      host: profile.mistralVoices?.host ?? '',
      guest: profile.mistralVoices?.guest ?? '',
    },
    theme: profile.theme,
    readingComfort: toEditingReadingComfort(profile.readingComfort),
  };
  this.showProfilePicker = true;
  this.showProfileForm = false;
  // Refresh voice catalog quand on ouvre l'éditeur : evite un hint stale si Mistral
  // a publié de nouvelles voix depuis le chargement initial. Non bloquant —
  // loadMistralVoices avale ses propres erreurs.
  this.loadMistralVoices?.()?.catch((e: unknown) => {
    console.error('voice catalog refresh failed:', e);
  });
};

const requireParentalAccess = function (this: AppContext, callback: () => void) {
  if (!this.editingProfile?.hasPin) {
    callback();
    return;
  }
  if (this.editingProfile._verifiedPin) {
    callback();
    return;
  }
  const editing = this.editingProfile;
  if (!editing) return;
  this.requirePin(async (pin: string) => {
    try {
      // SSRF: literal `/api/profiles/` inline (cf. executeDeleteProfile).
      const res = await fetch('/api/profiles/' + editing.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) {
        this.showToast(this.t('profile.pinWrong'), 'error');
        return;
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      this.showToast(this.t(TOAST_ERROR, { error: msg }), 'error');
      return;
    }
    editing._verifiedPin = pin;
    callback();
  });
};

// Garde PIN générique sur un profil CIBLÉ (≠ requireParentalAccess qui dépend de
// editingProfile). Utilisé pour la modification/suppression de la clé Mistral d'un
// profil mineur protégé. Sans PIN → exécute directement.
const requireProfilePin = function (this: AppContext, profileId: string, callback: () => void) {
  const profile = this.profiles.find((p: Profile) => p.id === profileId);
  if (!profile?.hasPin) {
    callback();
    return;
  }
  this.requirePin(async (pin: string) => {
    try {
      // SSRF: literal `/api/profiles/` inline (cf. requireParentalAccess).
      const res = await fetch('/api/profiles/' + profileId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) {
        this.showToast(this.t('profile.pinWrong'), 'error');
        return;
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      this.showToast(this.t(TOAST_ERROR, { error: msg }), 'error');
      return;
    }
    callback();
  });
};

const autoSaveProfile = function (this: AppContext, immediate?: boolean) {
  if (!this.editingProfile) return;
  if (this._autoSaveTimer) clearTimeout(this._autoSaveTimer);
  const doSave = async () => {
    const editing = this.editingProfile;
    if (!editing || !isProfileFormValid(editing)) return;
    const { id, locale } = editing;
    const updates = buildProfileUpdates(editing);
    if (this._saveController) this._saveController.abort();
    this._saveController = new AbortController();
    await this.updateProfile(id, updates, this._saveController.signal);
    if (this.currentProfile?.id === id && locale) this.setLocale(locale, true);
  };
  if (immediate) {
    doSave();
    return;
  }
  this._autoSaveTimer = setTimeout(doSave, 500);
};

const toggleModerationCategory = function (this: AppContext, cat: string) {
  this.requireParentalAccess(() => {
    const editing = this.editingProfile;
    if (!editing) return;
    const cats = (editing.moderationCategories ??= []);
    const idx = cats.indexOf(cat);
    if (idx >= 0) cats.splice(idx, 1);
    else cats.push(cat);
    this.autoSaveParental();
  });
};

const autoSaveParental = async function (this: AppContext) {
  if (!this.editingProfile) return;
  const { id, useModeration, moderationCategories, chatEnabled, _verifiedPin, updatedAt } =
    this.editingProfile;
  const updates: Record<string, unknown> = {
    useModeration,
    moderationCategories,
    chatEnabled,
    _updatedAt: updatedAt,
  };
  if (_verifiedPin) updates.pin = _verifiedPin;
  if (this._saveController) this._saveController.abort();
  this._saveController = new AbortController();
  await this.updateProfile(id, updates, this._saveController.signal);
};

const applyThemeLive = function (this: AppContext) {
  const theme = this.editingProfile?.theme;
  if (theme) {
    this.theme = theme;
    document.documentElement.dataset.theme = theme;
  } else {
    const stored = localStorage.getItem('sf-theme');
    const system = globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    this.theme = stored || system;
    document.documentElement.dataset.theme = this.theme;
  }
  this.autoSaveProfile(true);
};

// Aperçu live du confort de lecture pendant l'édition (même comportement que
// applyThemeLive : s'applique globalement, re-synchronisé au selectProfile).
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy (ESLint sans types) compte le param `this` typé comme unused.
const applyReadingComfortLive = function (this: AppContext) {
  applyReadingComfortVars(this.editingProfile?.readingComfort);
  this.autoSaveProfile(true);
};

const closeEditProfile = function (this: AppContext) {
  this.autoSaveProfile(true);
  this.editingProfile = null;
};

const resetProfileDefaults = function (this: AppContext) {
  if (!this.editingProfile) return;
  this.editingProfile.mistralVoices = { host: '', guest: '' };
  this.editingProfile.theme = undefined;
  this.editingProfile.readingComfort = toEditingReadingComfort(undefined);
  applyReadingComfortVars(this.editingProfile.readingComfort);
  this.applyThemeLive();
  this.showToast(this.t('toast.profileReset'), 'success');
};

const saveEditProfile = async function (this: AppContext) {
  this.autoSaveProfile(true);
  this.editingProfile = null;
};

const _toggleProfileProp = async function (this: AppContext, id: string, prop: string) {
  const profile = this.profiles.find((p: Profile) => p.id === id);
  if (!profile) return;
  const doToggle = async (pin?: string) => {
    const updates: Record<string, unknown> = {
      [prop]: !(profile as unknown as Record<string, unknown>)[prop],
    };
    if (pin) updates.pin = pin;
    await this.updateProfile(id, updates);
  };
  if (profile.hasPin) {
    this.requirePin(async (pin: string) => {
      await doToggle(pin);
    });
    return;
  }
  await doToggle();
};

const toggleModeration = async function (this: AppContext, id: string) {
  await this._toggleProfileProp(id, 'useModeration');
};

const toggleChat = async function (this: AppContext, id: string) {
  await this._toggleProfileProp(id, 'chatEnabled');
};

const openProfilePicker = function (this: AppContext) {
  this.showProfilePicker = true;
};

// PIN dialog helpers
const requirePin = function (this: AppContext, callback: (pin: string) => void) {
  this.pinVerifyInput = '';
  this.pinVerifyCallback = callback;
  this.showPinDialog = true;
  this.$nextTick(() => {
    (this.$refs.pinDialog as HTMLDialogElement | undefined)?.showModal();
    this.refreshIcons();
  });
};

const submitPinVerify = function (this: AppContext) {
  if (!/^\d{4}$/.test(this.pinVerifyInput)) return;
  const cb = this.pinVerifyCallback;
  const pin = this.pinVerifyInput;
  this.closePinDialog();
  if (cb) cb(pin);
};

const closePinDialog = function (this: AppContext) {
  this.showPinDialog = false;
  this.pinVerifyInput = '';
  this.pinVerifyCallback = null;
  (this.$refs.pinDialog as HTMLDialogElement | undefined)?.close();
};

export function createProfiles() {
  return {
    loadProfiles,
    selectProfile,
    requireProfilePin,
    createProfile,
    deleteProfile,
    _saveController: null as AbortController | null,
    applyProfileUpdate,
    updateProfile,
    startEditProfile,
    requireParentalAccess,
    _autoSaveTimer: null as ReturnType<typeof setTimeout> | null,
    autoSaveProfile,
    toggleModerationCategory,
    autoSaveParental,
    applyThemeLive,
    applyReadingComfortLive,
    closeEditProfile,
    resetProfileDefaults,
    saveEditProfile,
    _toggleProfileProp,
    toggleModeration,
    toggleChat,
    openProfilePicker,
    requirePin,
    submitPinVerify,
    closePinDialog,
  };
}
