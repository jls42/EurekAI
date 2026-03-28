import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./profile-locale', () => ({
  getProfileLocale: vi.fn((_id: string, fallback: string) => fallback),
  setProfileLocale: vi.fn(),
  clearProfileLocale: vi.fn(),
}));

import { createProfiles } from './profiles.js';
import { clearProfileLocale, setProfileLocale } from './profile-locale';

// Mock localStorage
const mockStorage: Record<string, string> = {};
vi.stubGlobal(
  'localStorage',
  Object.assign(Object.create(null), {
    getItem: (key: string) => mockStorage[key] ?? null,
    setItem: (key: string, value: string) => {
      mockStorage[key] = value;
    },
    removeItem: (key: string) => {
      delete mockStorage[key];
    },
  }),
);

function makeCtx(overrides: Record<string, any> = {}): Record<string, any> {
  return {
    profiles: [] as any[],
    currentProfile: null as any,
    showProfilePicker: false,
    showProfileForm: false,
    editingProfile: null as any,
    newProfileName: '',
    newProfileAge: '',
    newProfileAvatar: '0',
    newProfileLocale: 'fr',
    newProfilePin: '',
    newProfilePinConfirm: '',
    pinVerifyInput: '',
    pinVerifyCallback: null as any,
    showPinDialog: false,
    projects: [] as any[],
    currentProjectId: null as any,
    currentProject: null as any,
    setLocale: vi.fn(),
    resetState: vi.fn(),
    loadProjects: vi.fn(),
    showToast: vi.fn(),
    t: vi.fn((key: string) => key),
    confirmDelete: vi.fn((_target: string, cb: () => void) => cb()),
    requirePin: vi.fn(),
    refreshIcons: vi.fn(),
    $nextTick: vi.fn((cb: () => void) => cb()),
    $refs: { pinDialog: { showModal: vi.fn(), close: vi.fn() } },
    ...overrides,
  };
}

const profiles = createProfiles();

function callMethod(name: string, ctx: any, ...args: any[]) {
  return (profiles as any)[name].call(ctx, ...args);
}

describe('createProfiles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    for (const key of Object.keys(mockStorage)) delete mockStorage[key];
  });

  // --- selectProfile ---

  describe('selectProfile', () => {
    it('sets currentProfile and saves to localStorage', () => {
      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', locale: 'fr' }],
      });
      callMethod('selectProfile', ctx, 'p1');

      expect(ctx.currentProfile).toEqual({ id: 'p1', name: 'Alice', locale: 'fr' });
      expect(ctx.showProfilePicker).toBe(false);
      expect(mockStorage['sf-profileId']).toBe('p1');
    });

    it('calls setLocale with the profile locale', () => {
      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', locale: 'en' }],
      });
      callMethod('selectProfile', ctx, 'p1');

      expect(ctx.setLocale).toHaveBeenCalledWith('en', true);
    });

    it('resets project state and reloads projects', () => {
      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', locale: 'fr' }],
        currentProjectId: 'old-proj',
        currentProject: { id: 'old-proj' },
      });
      callMethod('selectProfile', ctx, 'p1');

      expect(ctx.currentProjectId).toBeNull();
      expect(ctx.currentProject).toBeNull();
      expect(ctx.resetState).toHaveBeenCalledOnce();
      expect(ctx.loadProjects).toHaveBeenCalledOnce();
    });

    it('does nothing if profile not found', () => {
      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', locale: 'fr' }],
      });
      callMethod('selectProfile', ctx, 'nonexistent');

      expect(ctx.currentProfile).toBeNull();
      expect(ctx.setLocale).not.toHaveBeenCalled();
    });
  });

  // --- createProfile ---

  describe('createProfile', () => {
    it('validates name and age, makes fetch, and selects new profile', async () => {
      const newProfile = { id: 'p2', name: 'Bob', age: 20, avatar: '3', locale: 'en' };
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(newProfile),
        }),
      );

      const ctx = makeCtx({
        newProfileName: '  Bob  ',
        newProfileAge: '20',
        newProfileAvatar: '3',
        newProfileLocale: 'en',
        profiles: [{ id: 'p1', name: 'Alice', locale: 'fr' }],
      });
      // Wire up selectProfile so it works
      ctx.selectProfile = profiles.selectProfile.bind(ctx);

      await callMethod('createProfile', ctx);

      expect(fetch).toHaveBeenCalledWith('/api/profiles', expect.objectContaining({ method: 'POST' }));
      expect(ctx.profiles).toHaveLength(2);
      expect(ctx.profiles[1]).toEqual(newProfile);
      // Form reset
      expect(ctx.newProfileName).toBe('');
      expect(ctx.newProfileAge).toBe('');
      expect(ctx.showProfileForm).toBe(false);
    });

    it('returns early with invalid name', async () => {
      vi.stubGlobal('fetch', vi.fn());
      const ctx = makeCtx({ newProfileName: '', newProfileAge: '10' });
      await callMethod('createProfile', ctx);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('returns early with invalid age (too young)', async () => {
      vi.stubGlobal('fetch', vi.fn());
      const ctx = makeCtx({ newProfileName: 'Test', newProfileAge: '2' });
      await callMethod('createProfile', ctx);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('returns early with invalid age (too old)', async () => {
      vi.stubGlobal('fetch', vi.fn());
      const ctx = makeCtx({ newProfileName: 'Test', newProfileAge: '121' });
      await callMethod('createProfile', ctx);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('returns early if child without valid PIN', async () => {
      vi.stubGlobal('fetch', vi.fn());
      const ctx = makeCtx({
        newProfileName: 'Child',
        newProfileAge: '9',
        newProfilePin: '12', // not 4 digits
        newProfilePinConfirm: '12',
      });
      await callMethod('createProfile', ctx);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('shows error toast when child PINs do not match', async () => {
      vi.stubGlobal('fetch', vi.fn());
      const ctx = makeCtx({
        newProfileName: 'Child',
        newProfileAge: '9',
        newProfilePin: '1234',
        newProfilePinConfirm: '5678',
      });
      await callMethod('createProfile', ctx);

      expect(ctx.showToast).toHaveBeenCalledWith('profile.pinMismatch', 'error');
      expect(fetch).not.toHaveBeenCalled();
    });

    it('sends PIN in body for child profiles', async () => {
      const newProfile = { id: 'p3', name: 'Child', age: 9, avatar: '0', locale: 'fr', hasPin: true };
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(newProfile),
        }),
      );

      const ctx = makeCtx({
        newProfileName: 'Child',
        newProfileAge: '9',
        newProfilePin: '1234',
        newProfilePinConfirm: '1234',
        newProfileAvatar: '0',
        newProfileLocale: 'fr',
      });
      ctx.selectProfile = vi.fn();

      await callMethod('createProfile', ctx);

      const body = JSON.parse((fetch as any).mock.calls[0][1].body);
      expect(body.pin).toBe('1234');
    });

    it('shows error toast on fetch failure', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Network error')),
      );

      const ctx = makeCtx({
        newProfileName: 'Bob',
        newProfileAge: '20',
      });
      await callMethod('createProfile', ctx);

      expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error');
    });
  });

  // --- deleteProfile ---

  describe('deleteProfile', () => {
    it('calls confirmDelete for profile without PIN', async () => {
      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: false }],
      });
      await callMethod('deleteProfile', ctx, 'p1');

      expect(ctx.confirmDelete).toHaveBeenCalled();
    });

    it('calls requirePin for profile with PIN', async () => {
      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: true }],
      });
      await callMethod('deleteProfile', ctx, 'p1');

      expect(ctx.requirePin).toHaveBeenCalled();
    });

    it('does nothing if profile not found', async () => {
      const ctx = makeCtx({ profiles: [] });
      await callMethod('deleteProfile', ctx, 'nonexistent');

      expect(ctx.confirmDelete).not.toHaveBeenCalled();
      expect(ctx.requirePin).not.toHaveBeenCalled();
    });

    it('executeDeleteProfile removes profile from state and clears locale', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: true }),
      );

      const ctx = makeCtx({
        profiles: [
          { id: 'p1', name: 'Alice', hasPin: false },
          { id: 'p2', name: 'Bob', hasPin: false },
        ],
        currentProfile: { id: 'p1', name: 'Alice' },
        // confirmDelete immediately calls the callback
        confirmDelete: vi.fn((_target: string, cb: () => void) => cb()),
      });
      ctx.selectProfile = vi.fn();

      await callMethod('deleteProfile', ctx, 'p1');
      // Wait for the async executeDeleteProfile to complete
      await vi.waitFor(() => {
        expect(ctx.showToast).toHaveBeenCalledWith('toast.profileDeleted', 'success');
      });

      expect(clearProfileLocale).toHaveBeenCalledWith('p1');
      expect(ctx.profiles).toHaveLength(1);
      expect(ctx.profiles[0].id).toBe('p2');
      // Since deleted profile was current, it should select the remaining one
      expect(ctx.selectProfile).toHaveBeenCalledWith('p2');
    });

    it('executeDeleteProfile shows picker when last profile is deleted', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: true }),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: false }],
        currentProfile: { id: 'p1', name: 'Alice' },
        confirmDelete: vi.fn((_target: string, cb: () => void) => cb()),
      });

      await callMethod('deleteProfile', ctx, 'p1');
      await vi.waitFor(() => {
        expect(ctx.showToast).toHaveBeenCalledWith('toast.profileDeleted', 'success');
      });

      expect(ctx.currentProfile).toBeNull();
      expect(ctx.showProfilePicker).toBe(true);
    });

    it('executeDeleteProfile shows error toast on fetch failure', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Network error')),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: false }],
        confirmDelete: vi.fn((_target: string, cb: () => void) => cb()),
      });

      await callMethod('deleteProfile', ctx, 'p1');
      await vi.waitFor(() => {
        expect(ctx.showToast).toHaveBeenCalled();
      });

      expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error');
    });

    it('executeDeleteProfile does not clear currentProfile when deleting a different profile', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: true }),
      );

      const ctx = makeCtx({
        profiles: [
          { id: 'p1', name: 'Alice', hasPin: false },
          { id: 'p2', name: 'Bob', hasPin: false },
        ],
        currentProfile: { id: 'p1', name: 'Alice' },
        confirmDelete: vi.fn((_target: string, cb: () => void) => cb()),
      });

      await callMethod('deleteProfile', ctx, 'p2');
      await vi.waitFor(() => {
        expect(ctx.showToast).toHaveBeenCalledWith('toast.profileDeleted', 'success');
      });

      // currentProfile should remain unchanged
      expect(ctx.currentProfile).toEqual({ id: 'p1', name: 'Alice' });
      expect(ctx.profiles).toHaveLength(1);
    });

    it('executeDeleteProfile sends PIN for profile with PIN', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: true }),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: true }],
        confirmDelete: vi.fn((_target: string, cb: () => void) => cb()),
      });
      // requirePin immediately invokes the callback with a PIN
      ctx.requirePin = vi.fn((cb: Function) => cb('1234'));

      await callMethod('deleteProfile', ctx, 'p1');
      await vi.waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const [url, opts] = (fetch as any).mock.calls[0];
      expect(url).toBe('/api/profiles/p1');
      expect(opts.method).toBe('DELETE');
      expect(JSON.parse(opts.body)).toEqual({ pin: '1234' });
    });

    it('deleteConfirmMessage includes project count when deleting current profile with projects', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: true }),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: false }],
        currentProfile: { id: 'p1', name: 'Alice' },
        projects: [{ id: 'proj1' }, { id: 'proj2' }],
        confirmDelete: vi.fn((_target: string, cb: () => void) => cb()),
      });

      await callMethod('deleteProfile', ctx, 'p1');

      // confirmDelete is called with the message from deleteConfirmMessage
      const target = ctx.confirmDelete.mock.calls[0][0];
      // t('profile.deleteConfirm', { count: 2 }) returns the key in mock
      expect(target).toBe('profile.deleteConfirm');
    });

    it('deleteConfirmMessage uses no-projects message for non-current profile', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: true }),
      );

      const ctx = makeCtx({
        profiles: [
          { id: 'p1', name: 'Alice', hasPin: false },
          { id: 'p2', name: 'Bob', hasPin: false },
        ],
        currentProfile: { id: 'p1', name: 'Alice' },
        projects: [{ id: 'proj1' }],
        confirmDelete: vi.fn((_target: string, cb: () => void) => cb()),
      });

      await callMethod('deleteProfile', ctx, 'p2');

      const target = ctx.confirmDelete.mock.calls[0][0];
      expect(target).toBe('profile.deleteConfirmNoProjects');
    });
  });

  // --- updateProfile ---

  describe('updateProfile', () => {
    it('updates profile in state on success', async () => {
      const updated = { id: 'p1', name: 'Alice Updated', locale: 'en' };
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(updated),
        }),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', locale: 'fr' }],
        currentProfile: { id: 'p1', name: 'Alice', locale: 'fr' },
      });
      await callMethod('updateProfile', ctx, 'p1', { name: 'Alice Updated', locale: 'en' });

      expect(ctx.profiles[0]).toEqual(updated);
      expect(ctx.currentProfile).toEqual(updated);
      expect(setProfileLocale).toHaveBeenCalledWith('p1', 'en');
    });

    it('shows error toast on non-ok response', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: false,
          json: () => Promise.resolve({ error: 'Bad PIN' }),
        }),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice' }],
      });
      await callMethod('updateProfile', ctx, 'p1', { name: 'X' });

      expect(ctx.showToast).toHaveBeenCalledWith('Bad PIN', 'error');
    });

    it('shows error toast on fetch failure', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Network')),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice' }],
      });
      await callMethod('updateProfile', ctx, 'p1', { name: 'X' });

      expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error');
    });

    it('does not update currentProfile if different profile is updated', async () => {
      const updated = { id: 'p2', name: 'Bob Updated' };
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(updated),
        }),
      );

      const ctx = makeCtx({
        profiles: [
          { id: 'p1', name: 'Alice' },
          { id: 'p2', name: 'Bob' },
        ],
        currentProfile: { id: 'p1', name: 'Alice' },
      });
      await callMethod('updateProfile', ctx, 'p2', { name: 'Bob Updated' });

      expect(ctx.currentProfile).toEqual({ id: 'p1', name: 'Alice' });
      expect(ctx.profiles[1]).toEqual(updated);
    });
  });

  // --- startEditProfile ---

  describe('startEditProfile', () => {
    it('sets editingProfile for profile without PIN', () => {
      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: false, locale: 'en' }],
      });
      callMethod('startEditProfile', ctx, 'p1');

      expect(ctx.editingProfile).toEqual({ id: 'p1', name: 'Alice', hasPin: false, locale: 'en' });
      expect(ctx.showProfileForm).toBe(false);
    });

    it('defaults locale to fr when profile has no locale', () => {
      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: false }],
      });
      callMethod('startEditProfile', ctx, 'p1');

      expect(ctx.editingProfile.locale).toBe('fr');
    });

    it('calls requirePin for profile with PIN', () => {
      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: true }],
      });
      callMethod('startEditProfile', ctx, 'p1');

      expect(ctx.requirePin).toHaveBeenCalled();
    });

    it('does nothing if profile not found', () => {
      const ctx = makeCtx({ profiles: [] });
      callMethod('startEditProfile', ctx, 'nonexistent');

      expect(ctx.editingProfile).toBeNull();
      expect(ctx.requirePin).not.toHaveBeenCalled();
    });

    it('with PIN, sets editingProfile with _verifiedPin on successful verification', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({}),
        }),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: true, locale: 'en' }],
      });
      // Make requirePin immediately invoke the callback with a test PIN
      ctx.requirePin = vi.fn((cb: Function) => cb('1234'));

      callMethod('startEditProfile', ctx, 'p1');

      // Wait for the async callback inside requirePin
      await vi.waitFor(() => {
        expect(ctx.editingProfile).not.toBeNull();
      });

      expect(ctx.editingProfile).toEqual({
        id: 'p1',
        name: 'Alice',
        hasPin: true,
        locale: 'en',
        _verifiedPin: '1234',
      });
      expect(ctx.showProfileForm).toBe(false);
    });

    it('with PIN, shows pinWrong toast when verification fails', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: false,
          json: () => Promise.resolve({ error: 'Bad PIN' }),
        }),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: true }],
      });
      ctx.requirePin = vi.fn((cb: Function) => cb('9999'));

      callMethod('startEditProfile', ctx, 'p1');

      await vi.waitFor(() => {
        expect(ctx.showToast).toHaveBeenCalled();
      });

      expect(ctx.showToast).toHaveBeenCalledWith('profile.pinWrong', 'error');
      expect(ctx.editingProfile).toBeNull();
    });

    it('with PIN, shows error toast on network failure', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Network fail')),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: true }],
      });
      ctx.requirePin = vi.fn((cb: Function) => cb('1234'));

      callMethod('startEditProfile', ctx, 'p1');

      await vi.waitFor(() => {
        expect(ctx.showToast).toHaveBeenCalled();
      });

      expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error');
      expect(ctx.editingProfile).toBeNull();
    });
  });

  // --- saveEditProfile ---

  describe('saveEditProfile', () => {
    it('calls updateProfile with correct data and clears editingProfile', async () => {
      const updated = { id: 'p1', name: 'Alice New', age: 10, locale: 'en' };
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(updated),
        }),
      );

      const ctx = makeCtx({
        editingProfile: {
          id: 'p1',
          name: '  Alice New  ',
          age: 10,
          avatar: '2',
          locale: 'en',
          useModeration: true,
          chatEnabled: false,
        },
        profiles: [{ id: 'p1', name: 'Alice', locale: 'fr' }],
        currentProfile: { id: 'p1', name: 'Alice', locale: 'fr' },
      });
      // Wire up updateProfile
      ctx.updateProfile = profiles.updateProfile.bind(ctx);

      await callMethod('saveEditProfile', ctx);

      expect(fetch).toHaveBeenCalledWith('/api/profiles/p1', expect.objectContaining({ method: 'PUT' }));
      expect(ctx.editingProfile).toBeNull();
      expect(ctx.showToast).toHaveBeenCalledWith('toast.profileUpdated', 'success');
    });

    it('includes verified PIN in updates', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({ id: 'p1', name: 'A', locale: 'fr' }),
        }),
      );

      const ctx = makeCtx({
        editingProfile: {
          id: 'p1',
          name: 'A',
          age: 10,
          avatar: '0',
          locale: 'fr',
          _verifiedPin: '1234',
        },
        profiles: [{ id: 'p1', name: 'A' }],
      });
      ctx.updateProfile = profiles.updateProfile.bind(ctx);

      await callMethod('saveEditProfile', ctx);

      const body = JSON.parse((fetch as any).mock.calls[0][1].body);
      expect(body.pin).toBe('1234');
    });

    it('returns early if editingProfile is null', async () => {
      vi.stubGlobal('fetch', vi.fn());
      const ctx = makeCtx({ editingProfile: null });
      await callMethod('saveEditProfile', ctx);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('returns early if name is empty', async () => {
      vi.stubGlobal('fetch', vi.fn());
      const ctx = makeCtx({
        editingProfile: { id: 'p1', name: '   ', age: 10 },
      });
      await callMethod('saveEditProfile', ctx);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('returns early if age is out of range', async () => {
      vi.stubGlobal('fetch', vi.fn());
      const ctx = makeCtx({
        editingProfile: { id: 'p1', name: 'Test', age: 3 },
      });
      await callMethod('saveEditProfile', ctx);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('calls setLocale when editing the current profile', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({ id: 'p1', name: 'A', locale: 'en' }),
        }),
      );

      const ctx = makeCtx({
        editingProfile: { id: 'p1', name: 'A', age: 10, avatar: '0', locale: 'en' },
        profiles: [{ id: 'p1', name: 'A', locale: 'fr' }],
        currentProfile: { id: 'p1', name: 'A', locale: 'fr' },
      });
      ctx.updateProfile = profiles.updateProfile.bind(ctx);

      await callMethod('saveEditProfile', ctx);

      expect(ctx.setLocale).toHaveBeenCalledWith('en', true);
    });
  });

  // --- requirePin ---

  describe('requirePin', () => {
    it('opens PIN dialog and sets callback', () => {
      const ctx = makeCtx();
      const callback = vi.fn();
      callMethod('requirePin', ctx, callback);

      expect(ctx.pinVerifyInput).toBe('');
      expect(ctx.pinVerifyCallback).toBe(callback);
      expect(ctx.showPinDialog).toBe(true);
      expect(ctx.$refs.pinDialog.showModal).toHaveBeenCalled();
      expect(ctx.refreshIcons).toHaveBeenCalled();
    });
  });

  // --- submitPinVerify ---

  describe('submitPinVerify', () => {
    it('validates PIN format (4 digits) and calls callback', () => {
      const callback = vi.fn();
      const ctx = makeCtx({
        pinVerifyInput: '1234',
        pinVerifyCallback: callback,
        showPinDialog: true,
      });
      // submitPinVerify calls this.closePinDialog(), so wire it up
      ctx.closePinDialog = profiles.closePinDialog.bind(ctx);
      callMethod('submitPinVerify', ctx);

      expect(callback).toHaveBeenCalledWith('1234');
      // Should have closed the dialog
      expect(ctx.showPinDialog).toBe(false);
      expect(ctx.pinVerifyInput).toBe('');
      expect(ctx.pinVerifyCallback).toBeNull();
    });

    it('returns early if PIN is not 4 digits', () => {
      const callback = vi.fn();
      const ctx = makeCtx({
        pinVerifyInput: '12',
        pinVerifyCallback: callback,
        showPinDialog: true,
      });
      callMethod('submitPinVerify', ctx);

      expect(callback).not.toHaveBeenCalled();
      expect(ctx.showPinDialog).toBe(true); // not closed
    });

    it('returns early if PIN contains non-digits', () => {
      const callback = vi.fn();
      const ctx = makeCtx({
        pinVerifyInput: '12ab',
        pinVerifyCallback: callback,
      });
      callMethod('submitPinVerify', ctx);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  // --- closePinDialog ---

  describe('closePinDialog', () => {
    it('resets PIN state and closes dialog', () => {
      const ctx = makeCtx({
        showPinDialog: true,
        pinVerifyInput: '1234',
        pinVerifyCallback: vi.fn(),
      });
      callMethod('closePinDialog', ctx);

      expect(ctx.showPinDialog).toBe(false);
      expect(ctx.pinVerifyInput).toBe('');
      expect(ctx.pinVerifyCallback).toBeNull();
      expect(ctx.$refs.pinDialog.close).toHaveBeenCalled();
    });
  });

  // --- openProfilePicker ---

  describe('openProfilePicker', () => {
    it('sets showProfilePicker to true', () => {
      const ctx = makeCtx({ showProfilePicker: false });
      callMethod('openProfilePicker', ctx);
      expect(ctx.showProfilePicker).toBe(true);
    });
  });

  // --- toggleModeration / toggleChat ---

  describe('toggleModeration', () => {
    it('calls _toggleProfileProp with useModeration', async () => {
      const updated = { id: 'p1', name: 'Alice', useModeration: true };
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(updated),
        }),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', useModeration: false, hasPin: false }],
        currentProfile: { id: 'p1', name: 'Alice', useModeration: false },
      });
      ctx.updateProfile = profiles.updateProfile.bind(ctx);
      ctx._toggleProfileProp = profiles._toggleProfileProp.bind(ctx);

      await callMethod('toggleModeration', ctx, 'p1');

      const body = JSON.parse((fetch as any).mock.calls[0][1].body);
      expect(body.useModeration).toBe(true);
    });
  });

  describe('toggleChat', () => {
    it('calls _toggleProfileProp with chatEnabled', async () => {
      const updated = { id: 'p1', name: 'Alice', chatEnabled: true };
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(updated),
        }),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', chatEnabled: false, hasPin: false }],
        currentProfile: { id: 'p1', name: 'Alice', chatEnabled: false },
      });
      ctx.updateProfile = profiles.updateProfile.bind(ctx);
      ctx._toggleProfileProp = profiles._toggleProfileProp.bind(ctx);

      await callMethod('toggleChat', ctx, 'p1');

      const body = JSON.parse((fetch as any).mock.calls[0][1].body);
      expect(body.chatEnabled).toBe(true);
    });
  });

  describe('_toggleProfileProp', () => {
    it('calls requirePin for profile with PIN', async () => {
      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: true, useModeration: false }],
      });
      await callMethod('_toggleProfileProp', ctx, 'p1', 'useModeration');

      expect(ctx.requirePin).toHaveBeenCalled();
    });

    it('does nothing if profile not found', async () => {
      vi.stubGlobal('fetch', vi.fn());
      const ctx = makeCtx({ profiles: [] });
      await callMethod('_toggleProfileProp', ctx, 'nonexistent', 'useModeration');

      expect(fetch).not.toHaveBeenCalled();
      expect(ctx.requirePin).not.toHaveBeenCalled();
    });

    it('with PIN, invokes requirePin callback then calls updateProfile with pin', async () => {
      const updated = { id: 'p1', name: 'Alice', useModeration: true };
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(updated),
        }),
      );

      const ctx = makeCtx({
        profiles: [{ id: 'p1', name: 'Alice', hasPin: true, useModeration: false }],
        currentProfile: { id: 'p1', name: 'Alice', useModeration: false },
      });
      ctx.updateProfile = profiles.updateProfile.bind(ctx);
      // requirePin immediately invokes the callback with a test PIN
      ctx.requirePin = vi.fn((cb: Function) => cb('4321'));

      await callMethod('_toggleProfileProp', ctx, 'p1', 'useModeration');

      // Wait for the async callback to complete
      await vi.waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const body = JSON.parse((fetch as any).mock.calls[0][1].body);
      expect(body.useModeration).toBe(true);
      expect(body.pin).toBe('4321');
    });
  });

  // --- loadProfiles ---

  describe('loadProfiles', () => {
    it('fetches profiles and restores last selected profile', async () => {
      const profileList = [
        { id: 'p1', name: 'Alice', locale: 'fr' },
        { id: 'p2', name: 'Bob', locale: 'en' },
      ];
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(profileList),
        }),
      );
      mockStorage['sf-profileId'] = 'p2';

      const ctx = makeCtx();
      ctx.selectProfile = vi.fn();

      await callMethod('loadProfiles', ctx);

      expect(ctx.profiles).toEqual(profileList);
      expect(ctx.selectProfile).toHaveBeenCalledWith('p2');
    });

    it('selects first profile if saved ID not found', async () => {
      const profileList = [{ id: 'p1', name: 'Alice', locale: 'fr' }];
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(profileList),
        }),
      );
      mockStorage['sf-profileId'] = 'deleted-id';

      const ctx = makeCtx();
      ctx.selectProfile = vi.fn();

      await callMethod('loadProfiles', ctx);

      expect(ctx.selectProfile).toHaveBeenCalledWith('p1');
    });

    it('shows profile picker when no profiles exist', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve([]),
        }),
      );

      const ctx = makeCtx();
      ctx.selectProfile = vi.fn();

      await callMethod('loadProfiles', ctx);

      expect(ctx.showProfilePicker).toBe(true);
      expect(ctx.selectProfile).not.toHaveBeenCalled();
    });

    it('handles fetch error gracefully', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Network')),
      );

      const ctx = makeCtx();
      ctx.selectProfile = vi.fn();

      // Should not throw
      await callMethod('loadProfiles', ctx);

      // Profiles remain empty, picker shows
      expect(ctx.profiles).toEqual([]);
      expect(ctx.showProfilePicker).toBe(true);
    });

    it('selects first profile when no saved ID exists', async () => {
      const profileList = [
        { id: 'p1', name: 'Alice', locale: 'fr' },
        { id: 'p2', name: 'Bob', locale: 'en' },
      ];
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(profileList),
        }),
      );
      // No saved profile ID

      const ctx = makeCtx();
      ctx.selectProfile = vi.fn();

      await callMethod('loadProfiles', ctx);

      expect(ctx.selectProfile).toHaveBeenCalledWith('p1');
    });
  });
});
