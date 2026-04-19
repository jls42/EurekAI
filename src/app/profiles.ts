import { clearProfileLocale, getProfileLocale, setProfileLocale } from './profile-locale';
import type { AppContext } from './app-context';
import type { Profile } from '../../types';

type EditingProfile = Profile & { _verifiedPin?: string; hasPin?: boolean };
type MistralVoicesPartial = { host?: string; guest?: string } | null | undefined;

/** Build RequestInit for DELETE /api/profiles/:id (optionally with PIN body). */
export function buildDeleteOpts(pin?: string): RequestInit {
  const opts: RequestInit = { method: 'DELETE' };
  if (pin) {
    opts.headers = { 'Content-Type': 'application/json' };
    opts.body = JSON.stringify({ pin });
  }
  return opts;
}

/** Apply local state cleanup after a successful DELETE /api/profiles/:id. */
export function finalizeDeleteProfile(state: AppContext, id: string): void {
  clearProfileLocale(id);
  state.profiles = state.profiles.filter((p: Profile) => p.id !== id);
  if (state.currentProfile?.id === id) {
    state.currentProfile = null;
    localStorage.removeItem('sf-profileId');
    if (state.profiles.length > 0) {
      state.selectProfile(state.profiles[0].id);
    } else {
      state.showProfilePicker = true;
    }
  }
  state.showToast(state.t('toast.profileDeleted'), 'success');
}

/** Execute the actual profile deletion (API call + state cleanup). */
export async function executeDeleteProfile(
  state: AppContext,
  id: string,
  pin?: string,
): Promise<void> {
  try {
    // fetch reste dans la même fonction que `buildDeleteOpts` pour que Codacy/Opengrep
    // taint analysis voie l'URL hardcodée (préfixe `/api/profiles/`) et que `rule-node-ssrf`
    // ne flagge pas. Ne pas extraire ce fetch dans un helper (cf. incident commit précédent
    // où `deleteProfileRequest(id, opts) → fetch(var, opts)` avait réactivé le finding SSRF).
    const res = await fetch('/api/profiles/' + id, buildDeleteOpts(pin));
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      state.showToast(state.t('toast.error', { error: err.error || res.statusText }), 'error');
      return;
    }
    finalizeDeleteProfile(state, id);
  } catch (e: unknown) {
    console.error('Failed to delete profile:', e);
    const msg = e instanceof Error ? e.message : String(e);
    state.showToast(state.t('toast.error', { error: msg }), 'error');
  }
}

/** Build the confirmation message for profile deletion. */
export function deleteConfirmMessage(state: AppContext, id: string): string {
  const projectCount = state.currentProfile?.id === id ? state.projects.length : 0;
  return projectCount > 0
    ? state.t('profile.deleteConfirm', { count: projectCount })
    : state.t('profile.deleteConfirmNoProjects');
}

/** Whether the edit form has a valid name + age pair. */
export function isProfileFormValid(p: EditingProfile | null | undefined): boolean {
  return !!p?.name?.trim() && !!p.age && p.age >= 4 && p.age <= 120;
}

/** Normalise partial voice selection : null when both empty, fill missing side with '' otherwise. */
export function buildVoicesUpdate(
  mistralVoices: MistralVoicesPartial,
): { host: string; guest: string } | null {
  if (!mistralVoices?.host && !mistralVoices?.guest) return null;
  return { host: mistralVoices.host || '', guest: mistralVoices.guest || '' };
}

/** Compose the PUT /api/profiles payload from the editingProfile snapshot. */
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
      const saved = localStorage.getItem('sf-profileId');
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
      localStorage.setItem('sf-profileId', id);
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
      const name = this.newProfileName.trim();
      const age = Number(this.newProfileAge);
      if (!name || !age || age < 4 || age > 120) return;
      // Validate PIN for under 15
      if (age < 15) {
        if (!/^\d{4}$/.test(this.newProfilePin)) return;
        if (this.newProfilePin !== this.newProfilePinConfirm) {
          this.showToast(this.t('profile.pinMismatch'), 'error');
          return;
        }
      }
      try {
        const body: Record<string, unknown> = {
          name,
          age,
          avatar: this.newProfileAvatar,
          locale: this.newProfileLocale,
        };
        if (age < 15) body.pin = this.newProfilePin;
        const res = await fetch('/api/profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          const profile = await res.json();
          this.profiles.push(profile);
          this.selectProfile(profile.id);
          this.newProfileName = '';
          this.newProfileAge = '';
          this.newProfileAvatar = '0';
          this.newProfileLocale = 'fr';
          this.newProfilePin = '';
          this.newProfilePinConfirm = '';
          this.showProfileForm = false;
        } else {
          const err = await res.json().catch(() => ({}));
          this.showToast(this.t('toast.error', { error: err.error || res.statusText }), 'error');
        }
      } catch (e: unknown) {
        console.error('Failed to create profile:', e);
        const msg = e instanceof Error ? e.message : String(e);
        this.showToast(this.t('toast.error', { error: msg }), 'error');
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
        this.showToast(this.t('toast.error', { error: msg }), 'error');
      }
    },

    startEditProfile(this: AppContext, id: string) {
      const profile = this.profiles.find((p: Profile) => p.id === id);
      if (!profile) return;
      this.editingProfile = {
        ...profile,
        locale: profile.locale || 'fr',
        mistralVoices: profile.mistralVoices || { host: '', guest: '' },
        theme: profile.theme || '',
      };
      this.showProfilePicker = true;
      this.showProfileForm = false;
      // Refresh voice catalog quand on ouvre l'éditeur : evite un hint stale si Mistral
      // a publié de nouvelles voix depuis le chargement initial. Non bloquant.
      this.loadMistralVoices?.();
    },

    /** Verify PIN before allowing parental settings changes. */
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
          this.showToast(this.t('toast.error', { error: msg }), 'error');
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
