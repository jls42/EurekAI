import { clearProfileLocale, getProfileLocale, setProfileLocale } from './profile-locale';

/** Execute the actual profile deletion (API call + state cleanup). */
async function executeDeleteProfile(
  state: any,
  id: string,
  pin?: string,
): Promise<void> {
  const opts: RequestInit = { method: 'DELETE' };
  if (pin) {
    opts.headers = { 'Content-Type': 'application/json' };
    opts.body = JSON.stringify({ pin });
  }
  try {
    await fetch('/api/profiles/' + id, opts);
    clearProfileLocale(id);
    state.profiles = state.profiles.filter((p: any) => p.id !== id);
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
  } catch (e: any) {
    console.error('Failed to delete profile:', e);
    state.showToast(state.t('toast.error', { error: e.message }), 'error');
  }
}

/** Build the confirmation message for profile deletion. */
function deleteConfirmMessage(state: any, id: string): string {
  const projectCount = state.currentProfile?.id === id ? state.projects.length : 0;
  return projectCount > 0
    ? state.t('profile.deleteConfirm', { count: projectCount })
    : state.t('profile.deleteConfirmNoProjects');
}

export function createProfiles() {
  return {
    async loadProfiles(this: any) {
      try {
        const res = await fetch('/api/profiles');
        if (res.ok) this.profiles = await res.json();
      } catch (e: any) {
        console.error('Failed to load profiles:', e);
      }
      // Restore last selected profile
      const saved = localStorage.getItem('sf-profileId');
      if (saved && this.profiles.some((p: any) => p.id === saved)) {
        this.selectProfile(saved);
      } else if (this.profiles.length > 0) {
        this.selectProfile(this.profiles[0].id);
      } else {
        this.showProfilePicker = true;
      }
    },

    selectProfile(this: any, id: string) {
      const profile = this.profiles.find((p: any) => p.id === id);
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
        const system = globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.theme = stored || system;
        document.documentElement.dataset.theme = this.theme;
      }
      // Reset project state and reload projects for this profile
      this.currentProjectId = null;
      this.currentProject = null;
      this.resetState();
      this.loadProjects();
    },

    async createProfile(this: any) {
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
        const body: any = {
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
        }
      } catch (e: any) {
        console.error('Failed to create profile:', e);
        this.showToast(this.t('toast.error', { error: e.message }), 'error');
      }
    },

    async deleteProfile(this: any, id: string) {
      const profile = this.profiles.find((p: any) => p.id === id);
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

    async updateProfile(this: any, id: string, updates: Record<string, any>) {
      try {
        const res = await fetch('/api/profiles/' + id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        if (res.ok) {
          const updated = await res.json();
          const idx = this.profiles.findIndex((p: any) => p.id === id);
          if (idx !== -1) this.profiles[idx] = updated;
          if (this.currentProfile?.id === id) this.currentProfile = updated;
          if (updated.locale) setProfileLocale(id, updated.locale);
        } else {
          const err = await res.json();
          if (err.error) this.showToast(err.error, 'error');
        }
      } catch (e: any) {
        console.error('Failed to update profile:', e);
        this.showToast(this.t('toast.error', { error: e.message }), 'error');
      }
    },

    startEditProfile(this: any, id: string) {
      const profile = this.profiles.find((p: any) => p.id === id);
      if (!profile) return;
      this.editingProfile = { ...profile, locale: profile.locale || 'fr', mistralVoices: profile.mistralVoices || { host: '', guest: '' }, theme: profile.theme || '' };
      this.showProfilePicker = true;
      this.showProfileForm = false;
    },

    /** Verify PIN before allowing parental settings changes. */
    requireParentalAccess(this: any, callback: () => void) {
      if (!this.editingProfile?.hasPin) {
        callback();
        return;
      }
      if (this.editingProfile._verifiedPin) {
        callback();
        return;
      }
      this.requirePin(async (pin: string) => {
        try {
          const res = await fetch('/api/profiles/' + this.editingProfile.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin, useModeration: this.editingProfile.useModeration }),
          });
          if (!res.ok) {
            this.showToast(this.t('profile.pinWrong'), 'error');
            return;
          }
        } catch (e: any) {
          this.showToast(this.t('toast.error', { error: e.message }), 'error');
          return;
        }
        this.editingProfile._verifiedPin = pin;
        callback();
      });
    },

    _autoSaveTimer: null as ReturnType<typeof setTimeout> | null,

    autoSaveProfile(this: any, immediate?: boolean) {
      if (!this.editingProfile) return;
      if (this._autoSaveTimer) clearTimeout(this._autoSaveTimer);
      const doSave = async () => {
        const { id, name, age, avatar, locale, mistralVoices, theme, _verifiedPin } = this.editingProfile;
        if (!name?.trim() || !age || age < 4 || age > 120) return;
        const updates: any = {
          name: name.trim(), age, avatar, locale,
          mistralVoices: (mistralVoices?.host && mistralVoices?.guest) ? mistralVoices : null,
          theme: theme || null,
        };
        if (_verifiedPin) updates.pin = _verifiedPin;
        await this.updateProfile(id, updates);
        if (this.currentProfile?.id === id) {
          if (locale) this.setLocale(locale, true);
        }
      };
      if (immediate) { doSave(); return; }
      this._autoSaveTimer = setTimeout(doSave, 500);
    },

    autoSaveParental(this: any) {
      if (!this.editingProfile) return;
      const { id, useModeration, moderationCategories, chatEnabled, _verifiedPin } = this.editingProfile;
      const updates: any = { useModeration, moderationCategories, chatEnabled };
      if (_verifiedPin) updates.pin = _verifiedPin;
      this.updateProfile(id, updates);
    },

    applyThemeLive(this: any) {
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
    },

    closeEditProfile(this: any) {
      this.autoSaveProfile(true);
      this.editingProfile = null;
    },

    resetProfileDefaults(this: any) {
      if (!this.editingProfile) return;
      this.editingProfile.mistralVoices = { host: '', guest: '' };
      this.editingProfile.theme = '';
      this.applyThemeLive();
      this.autoSaveProfile(true);
      this.showToast(this.t('toast.profileReset'), 'success');
    },

    /** @deprecated Use autoSaveProfile — kept for test compat */
    async saveEditProfile(this: any) {
      this.autoSaveProfile(true);
      this.editingProfile = null;
    },

    async _toggleProfileProp(this: any, id: string, prop: string) {
      const profile = this.profiles.find((p: any) => p.id === id);
      if (!profile) return;
      const doToggle = async (pin?: string) => {
        const updates: any = { [prop]: !profile[prop] };
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

    async toggleModeration(this: any, id: string) {
      await this._toggleProfileProp(id, 'useModeration');
    },

    async toggleChat(this: any, id: string) {
      await this._toggleProfileProp(id, 'chatEnabled');
    },

    openProfilePicker(this: any) {
      this.showProfilePicker = true;
    },

    // PIN dialog helpers
    requirePin(this: any, callback: (pin: string) => void) {
      this.pinVerifyInput = '';
      this.pinVerifyCallback = callback;
      this.showPinDialog = true;
      this.$nextTick(() => {
        this.$refs.pinDialog?.showModal();
        this.refreshIcons();
      });
    },

    submitPinVerify(this: any) {
      if (!/^\d{4}$/.test(this.pinVerifyInput)) return;
      const cb = this.pinVerifyCallback;
      const pin = this.pinVerifyInput;
      this.closePinDialog();
      if (cb) cb(pin);
    },

    closePinDialog(this: any) {
      this.showPinDialog = false;
      this.pinVerifyInput = '';
      this.pinVerifyCallback = null;
      this.$refs.pinDialog?.close();
    },
  };
}
