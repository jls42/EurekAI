import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRecorder } from './recorder';

globalThis.fetch = vi.fn();

function makeContext(overrides: any = {}) {
  return {
    currentProjectId: 'pid-1',
    recording: false,
    recorder: null as any,
    recordingDuration: 0,
    recordingTimer: null as ReturnType<typeof setInterval> | null,
    sources: [] as any[],
    selectedIds: [] as string[],
    loading: { voice: false } as Record<string, boolean>,
    locale: 'fr',
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    refreshIcons: vi.fn(),
    refreshModeration: vi.fn(),
    resolveError: vi.fn((e: string) => e),
    $nextTick: vi.fn((cb: () => void) => cb()),
    apiBase: vi.fn(() => '/api/projects/pid-1'),
    startRecording: vi.fn(),
    stopRecording: vi.fn(),
    ...overrides,
  };
}

describe('createRecorder', () => {
  let rec: ReturnType<typeof createRecorder>;
  let ctx: ReturnType<typeof makeContext>;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(globalThis.fetch).mockClear();
    rec = createRecorder();
    ctx = makeContext();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('toggleRecording', () => {
    it('calls startRecording when not recording', async () => {
      ctx.recording = false;
      ctx.startRecording = vi.fn();
      await rec.toggleRecording.call(ctx);
      expect(ctx.startRecording).toHaveBeenCalled();
    });

    it('calls stopRecording when recording', async () => {
      ctx.recording = true;
      ctx.stopRecording = vi.fn();
      await rec.toggleRecording.call(ctx);
      expect(ctx.stopRecording).toHaveBeenCalled();
    });
  });

  describe('stopRecording', () => {
    it('sets recording=false and clears timer', () => {
      ctx.recording = true;
      ctx.recordingTimer = setInterval(() => {}, 1000);
      ctx.recorder = { state: 'recording', stop: vi.fn() };

      rec.stopRecording.call(ctx);

      expect(ctx.recording).toBe(false);
      expect(ctx.recordingTimer).toBeNull();
      expect(ctx.recorder.stop).toHaveBeenCalled();
    });

    it('does not call stop if recorder is not recording', () => {
      ctx.recording = true;
      ctx.recorder = { state: 'inactive', stop: vi.fn() };

      rec.stopRecording.call(ctx);

      expect(ctx.recording).toBe(false);
      expect(ctx.recorder.stop).not.toHaveBeenCalled();
    });

    it('handles null recorder gracefully', () => {
      ctx.recording = true;
      ctx.recorder = null;

      rec.stopRecording.call(ctx);

      expect(ctx.recording).toBe(false);
    });
  });

  describe('uploadVoice', () => {
    it('fetches voice endpoint, adds source on success', async () => {
      const source = { id: 's1', type: 'voice', text: 'Transcribed text' };
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => source,
      } as any);
      const blob = new Blob(['audio'], { type: 'audio/webm' });

      await rec.uploadVoice.call(ctx, blob);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/sources/voice', {
        method: 'POST',
        body: expect.any(FormData),
      });
      expect(ctx.sources).toEqual([source]);
      expect(ctx.selectedIds).toEqual(['s1']);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.voiceTranscribed', 'success');
      expect(ctx.loading.voice).toBe(false);
    });

    it('shows error on failed response', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request',
        json: async () => ({ error: 'Invalid audio' }),
      } as any);
      const blob = new Blob(['audio'], { type: 'audio/webm' });

      await rec.uploadVoice.call(ctx, blob);

      expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error');
      expect(ctx.sources).toEqual([]);
      expect(ctx.loading.voice).toBe(false);
    });

    it('shows network error on exception', async () => {
      vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network error'));
      const blob = new Blob(['audio'], { type: 'audio/webm' });

      await rec.uploadVoice.call(ctx, blob);

      expect(ctx.showToast).toHaveBeenCalledWith('toast.transcriptionError', 'error');
      expect(ctx.loading.voice).toBe(false);
    });

    it('returns early if no projectId', async () => {
      ctx.currentProjectId = '';
      const blob = new Blob(['audio'], { type: 'audio/webm' });

      await rec.uploadVoice.call(ctx, blob);

      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('sets loading.voice during execution', async () => {
      let resolvePromise: (v: any) => void;
      vi.mocked(globalThis.fetch).mockReturnValueOnce(
        new Promise((resolve) => {
          resolvePromise = resolve;
        }) as any,
      );
      const blob = new Blob(['audio'], { type: 'audio/webm' });

      const promise = rec.uploadVoice.call(ctx, blob);
      expect(ctx.loading.voice).toBe(true);

      resolvePromise!({
        ok: true,
        json: async () => ({ id: 's1' }),
      });
      await promise;
      expect(ctx.loading.voice).toBe(false);
    });
  });

  describe('startRecording', () => {
    let mockStart: ReturnType<typeof vi.fn>;
    let mockStop: ReturnType<typeof vi.fn>;
    let onDataAvailable: ((e: any) => void) | null = null;
    let onStop: (() => void) | null = null;
    let mockTrackStop: ReturnType<typeof vi.fn>;
    let mockStream: { getTracks: () => { stop: ReturnType<typeof vi.fn> }[] };

    beforeEach(() => {
      onDataAvailable = null;
      onStop = null;
      mockStart = vi.fn();
      mockStop = vi.fn();

      class FakeMediaRecorder {
        start = mockStart;
        stop = mockStop;
        state = 'recording';
        set ondataavailable(fn: any) { onDataAvailable = fn; }
        set onstop(fn: any) { onStop = fn; }
      }

      mockTrackStop = vi.fn();
      mockStream = { getTracks: () => [{ stop: mockTrackStop }] };
      vi.stubGlobal('navigator', {
        mediaDevices: { getUserMedia: vi.fn().mockResolvedValue(mockStream) },
      });
      vi.stubGlobal('MediaRecorder', FakeMediaRecorder);
    });

    it('successful recording start', async () => {
      const promise = rec.startRecording.call(ctx);
      await vi.advanceTimersByTimeAsync(0);
      await promise;

      expect(ctx.recording).toBe(true);
      expect(ctx.recordingDuration).toBe(0);
      expect(ctx.recorder).toBeDefined();
      expect(mockStart).toHaveBeenCalled();
      expect(ctx.recordingTimer).not.toBeNull();
    });

    it('timer increments recordingDuration', async () => {
      const promise = rec.startRecording.call(ctx);
      await vi.advanceTimersByTimeAsync(0);
      await promise;

      expect(ctx.recordingDuration).toBe(0);
      vi.advanceTimersByTime(3000);
      expect(ctx.recordingDuration).toBe(3);
    });

    it('onstop callback creates blob and calls uploadVoice', async () => {
      ctx.uploadVoice = vi.fn();
      const promise = rec.startRecording.call(ctx);
      await vi.advanceTimersByTimeAsync(0);
      await promise;

      // Simulate data available
      onDataAvailable!({ data: new Blob(['chunk1']) });
      onDataAvailable!({ data: new Blob(['chunk2']) });

      // Trigger onstop
      await onStop!();

      expect(mockTrackStop).toHaveBeenCalled();
      expect(ctx.uploadVoice).toHaveBeenCalledWith(expect.any(Blob));
    });

    it('getUserMedia rejection shows error toast', async () => {
      vi.mocked(navigator.mediaDevices.getUserMedia).mockRejectedValueOnce(
        new Error('Permission denied'),
      );

      const promise = rec.startRecording.call(ctx);
      await vi.advanceTimersByTimeAsync(0);
      await promise;

      expect(ctx.showToast).toHaveBeenCalledWith(
        'toast.micError',
        'error',
      );
      expect(ctx.recording).toBe(false);
    });
  });
});
