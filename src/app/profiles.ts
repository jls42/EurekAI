import { clearProfileLocale, getProfileLocale, setProfileLocale } from './profile-locale';
import type { AppContext } from './app-context';
import type { Profile } from '../../types';
import type { CreateProfileBody } from '../../routes/profiles';

type EditingProfile = Profile & { _verifiedPin?: string; hasPin?: boolean };
type MistralVoicesPartial = { host?: string; guest?: string } | null | undefined;

const LS_PROFILE_ID = 'sf-profileId';
const TOAST_ERROR = 'toast.error';

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
  state.profiles = state.profiles.filter((p: Profile) => p.id !== id);
  if (state.currentProfile?.id === id) {
    state.currentProfile = null;
    localStorage.removeItem(LS_PROFILE_ID);
    if (state.profiles.length > 0) {
      state.selectProfile(state.profiles[0].id);
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
      state.showToast(state.t(TOAST_ERROR, { error: err.error || res.statusText }), 'error');
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
  state.selectProfile(profile.id);
  state.newProfileName = '';
  state.newProfileAge = '';
  state.newProfileAvatar = '0';
  state.newProfileLocale = 'fr';
  state.newProfilePin = '';
  state.newProfilePinConfirm = '';
  state.showProfileForm = false;
}

export function buildProfileUpdates(editingProfile: EditingProfile): Record<string, unknown> {
  const { name, age, avatar, locale, mistralVoices, theme, _verifiedPin, updatedAt } =
    editingProfile;
  const updates: Record<string, unknown> = {
    name: name.trim(),
    age,
    avatar,
    locale,
    mistralVoices: buildVoicesUpdate(mistralVoices),
    theme: theme || null,
    _updatedAt: updatedAt,
  };
  if (_verifiedPin) updates.pin = _verifiedPin;
  return updates;
}

export function createProfiles() {
  return {
    async loadProfiles(this: AppContext) {
      try {
        const res = await fetch('/api/profiles');
        if (res.ok) this.profiles = await res.json();
      } catch (e: unknown) {
        console.error('Failed to load profiles:', e);
      }
      // Restore last selected profile
      const saved = localStorage.getItem(LS_PROFILE_ID);
      if (saved && this.profiles.some((p: Profile) => p.id === saved)) {
        this.selectProfile(saved);
      } else if (this.profiles.length > 0) {
        this.selectProfile(this.profiles[0].id);
      } else {
        this.showProfilePicker = true;
      }
    },

    selectProfile(this: AppContext, id: string) {
      const profile = this.profiles.find((p: Profile) => p.id === id);
      if (!profile) return;
      this.currentProfile = profile;
      this.showProfilePicker = false;
      localStorage.setItem(LS_PROFILE_ID, id);
      this.setLocale(getProfileLocale(id, profile.locale || 'fr'), true);
      // Apply profile theme or fallback to localStorage/system default
      if (profile.theme) {
        this.theme = profile.theme;
        document.documentElement.dataset.theme = profile.theme;
      } else {
        const stored = localStorage.getItem('sf-theme');
        const system = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        this.theme = stored || system;
        document.documentElement.dataset.theme = this.theme;
      }
      // Reset project state and reload projects for this profile
      this.currentProjectId = null;
      this.currentProject = null;
      this.resetState();
      this.loadProjects();
    },

    async createProfile(this: AppContext) {
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
          this.showToast(this.t(TOAST_ERROR, { error: err.error || res.statusText }), 'error');
        }
      } catch (e: unknown) {
        console.error('Failed to create profile:', e);
        const msg = e instanceof Error ? e.message : String(e);
        this.showToast(this.t(TOAST_ERROR, { error: msg }), 'error');
      }
    },

    async deleteProfile(this: AppContext, id: string) {
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
    },

    _saveController: null as AbortController | null,

    applyProfileUpdate(this: AppContext, id: string, updated: Profile) {
      const idx = this.profiles.findIndex((p: Profile) => p.id === id);
      if (idx !== -1) this.profiles[idx] = updated;
      if (this.currentProfile?.id === id) this.currentProfile = updated;
      if (this.editingProfile?.id === id) {
        if (updated.updatedAt) this.editingProfile.updatedAt = updated.updatedAt;
        if (updated.ageGroup) this.editingProfile.ageGroup = updated.ageGroup;
      }
      if (updated.locale) setProfileLocale(id, updated.locale);
    },

    async updateProfile(
      this: AppContext,
      id: string,
      updates: Record<string, unknown>,
      signal?: AbortSignal,
    ) {
      try {
        const res = await fetch('/api/profiles/' + id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
          signal,
        });
        if (signal?.aborted) return;
        if (res.ok) {
          this.applyProfileUpdate(id, await res.json());
        } else {
          const err = await res.json().catch(() => ({}));
          if (err.error) this.showToast(err.error, 'error');
        }
      } catch (e: unknown) {
        if (e instanceof Error && e.name === 'AbortError') return;
        console.error('Failed to update profile:', e);
        const msg = e instanceof Error ? e.message : String(e);
        this.showToast(this.t(TOAST_ERROR, { error: msg }), 'error');
      }
    },

    startEditProfile(this: AppContext, id: string) {
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
      };
      this.showProfilePicker = true;
      this.showProfileForm = false;
      // Refresh voice catalog quand on ouvre l'éditeur : evite un hint stale si Mistral
      // a publié de nouvelles voix depuis le chargement initial. Non bloquant.
      this.loadMistralVoices?.();
    },

    requireParentalAccess(this: AppContext, callback: () => void) {
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
    },

    _autoSaveTimer: null as ReturnType<typeof setTimeout> | null,

    autoSaveProfile(this: AppContext, immediate?: boolean) {
      if (!this.editingProfile) return;
      if (this._autoSaveTimer) clearTimeout(this._autoSaveTimer);
      const doSave = async () => {
        const editing = this.editingProfile;
        if (!isProfileFormValid(editing) || !editing) return;
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
    },

    toggleModerationCategory(this: AppContext, cat: string) {
      this.requireParentalAccess(() => {
        const editing = this.editingProfile;
        if (!editing) return;
        const cats = (editing.moderationCategories ??= []);
        const idx = cats.indexOf(cat);
        if (idx >= 0) cats.splice(idx, 1);
        else cats.push(cat);
        this.autoSaveParental();
      });
    },

    async autoSaveParental(this: AppContext) {
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
    },

    applyThemeLive(this: AppContext) {
      const theme = this.editingProfile?.theme;
      if (theme) {
        this.theme = theme;
        document.documentElement.dataset.theme = theme;
      } else {
        const stored = localStorage.getItem('sf-theme');
        const system = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        this.theme = stored || system;
        document.documentElement.dataset.theme = this.theme;
      }
      this.autoSaveProfile(true);
    },

    closeEditProfile(this: AppContext) {
      this.autoSaveProfile(true);
      this.editingProfile = null;
    },

    resetProfileDefaults(this: AppContext) {
      if (!this.editingProfile) return;
      this.editingProfile.mistralVoices = { host: '', guest: '' };
      this.editingProfile.theme = undefined;
      this.applyThemeLive();
      this.showToast(this.t('toast.profileReset'), 'success');
    },

    /** @deprecated Use autoSaveProfile — kept for test compat */
    async saveEditProfile(this: AppContext) {
      this.autoSaveProfile(true);
      this.editingProfile = null;
    },

    async _toggleProfileProp(this: AppContext, id: string, prop: string) {
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
    },

    async toggleModeration(this: AppContext, id: string) {
      await this._toggleProfileProp(id, 'useModeration');
    },

    async toggleChat(this: AppContext, id: string) {
      await this._toggleProfileProp(id, 'chatEnabled');
    },

    openProfilePicker(this: AppContext) {
      this.showProfilePicker = true;
    },

    // PIN dialog helpers
    requirePin(this: AppContext, callback: (pin: string) => void) {
      this.pinVerifyInput = '';
      this.pinVerifyCallback = callback;
      this.showPinDialog = true;
      this.$nextTick(() => {
        (this.$refs.pinDialog as HTMLDialogElement | undefined)?.showModal();
        this.refreshIcons();
      });
    },

    submitPinVerify(this: AppContext) {
      if (!/^\d{4}$/.test(this.pinVerifyInput)) return;
      const cb = this.pinVerifyCallback;
      const pin = this.pinVerifyInput;
      this.closePinDialog();
      if (cb) cb(pin);
    },

    closePinDialog(this: AppContext) {
      this.showPinDialog = false;
      this.pinVerifyInput = '';
      this.pinVerifyCallback = null;
      (this.$refs.pinDialog as HTMLDialogElement | undefined)?.close();
    },
  };
}
