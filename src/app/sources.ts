import { addCostDelta } from './cost-utils';
import type { AppContext, AppState } from './app-context';
import type { Source } from '../../types';

type UploadResult = 'applied' | 'ignored' | 'failed';
type UploadSession = AppState['uploadSessions'][number];
type UploadFile = UploadSession['files'][number];

function _isSessionActive(ctx: AppContext, session: UploadSession): boolean {
  return (
    ctx.uploadSessions.some((s: UploadSession) => s.id === session.id) &&
    ctx.currentProjectId === session.projectId
  );
}

async function _resolveHttpError(
  ctx: AppContext,
  session: UploadSession,
  res: Response,
): Promise<string | null> {
  try {
    const err = await res.json();
    if (!_isSessionActive(ctx, session)) return null;
    return ctx.resolveError(err.error || res.statusText);
  } catch {
    if (!_isSessionActive(ctx, session)) return null;
    return res.statusText;
  }
}

function _applyUploadSuccess(
  ctx: AppContext,
  session: UploadSession,
  file: UploadFile,
  newSources: Source[],
) {
  ctx.sources.push(...newSources);
  ctx.selectedIds.push(...newSources.map((s: Source) => s.id));
  for (const s of newSources) addCostDelta(ctx, s.estimatedCost, 'sources/upload');
  file.file = null;
  file.status = 'done';
  ctx.$nextTick(() => ctx.refreshIcons());
  if (newSources.some((s: Source) => s.moderation?.status === 'pending')) {
    setTimeout(() => {
      if (_isSessionActive(ctx, session)) ctx.refreshModeration();
    }, 2000);
  }
}

async function _uploadSingleFile(
  this: AppContext,
  session: UploadSession,
  fileId: string,
): Promise<UploadResult> {
  if (!_isSessionActive(this, session)) return 'ignored';
  const file = session.files.find((f: UploadFile) => f.id === fileId);
  if (!file?.file) return 'ignored';

  file.status = 'uploading';
  file.errorMsg = null;
  this.$nextTick(() => this.refreshIcons());

  const formData = new FormData();
  formData.append('files', file.file, file.name);
  formData.append('lang', this.locale);

  try {
    const res = await fetch(`/api/projects/${session.projectId}/sources/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!_isSessionActive(this, session)) return 'ignored';

    if (!res.ok) {
      const resolved = await _resolveHttpError(this, session, res);
      if (resolved === null) return 'ignored';
      file.status = 'error';
      file.errorMsg = resolved;
      this.$nextTick(() => this.refreshIcons());
      this.showToast(this.t('toast.error', { error: resolved }), 'error');
      return 'failed';
    }

    const newSources = await res.json();
    if (!_isSessionActive(this, session)) return 'ignored';

    _applyUploadSuccess(this, session, file, newSources);
    return 'applied';
  } catch (e: unknown) {
    if (!_isSessionActive(this, session)) return 'ignored';
    const msg = e instanceof Error ? e.message : String(e);
    file.status = 'error';
    file.errorMsg = msg;
    this.$nextTick(() => this.refreshIcons());
    this.showToast(this.t('toast.uploadError', { filename: file.name, error: msg }), 'error');
    return 'failed';
  }
}

function _scheduleConsigneRefresh(this: AppContext, projectId: string) {
  setTimeout(() => {
    if (this.currentProjectId === projectId) this.refreshConsigne();
  }, 3000);
}

function _maybeCleanupSession(this: AppContext, sessionId: string) {
  const session = this.uploadSessions.find((s: UploadSession) => s.id === sessionId);
  if (!session || session.cleanupScheduled || session.files.length === 0) return;
  if (session.files.every((f: UploadFile) => f.status === 'done')) {
    session.cleanupScheduled = true;
    setTimeout(() => {
      this.uploadSessions = this.uploadSessions.filter((s: UploadSession) => s.id !== sessionId);
      this.$nextTick(() => this.refreshIcons());
    }, 3000);
  }
}

export function createSources() {
  return {
    handleDrop(this: AppContext, e: DragEvent) {
      this.dragging = false;
      this.handleFiles(e.dataTransfer?.files);
    },

    async handleFiles(this: AppContext, fileList: FileList | undefined | null) {
      const projectId = this.currentProjectId;
      if (!fileList || fileList.length === 0 || !projectId) return;

      const sessionId = crypto.randomUUID();
      const files = Array.from(fileList).map((f) => ({
        id: crypto.randomUUID(),
        name: f.name,
        file: f as File | null,
        status: 'pending' as const,
        errorMsg: null as string | null,
      }));
      this.uploadSessions.push({ id: sessionId, projectId, files, cleanupScheduled: false });
      this.$nextTick(() => this.refreshIcons());

      const session = this.uploadSessions.find((s: UploadSession) => s.id === sessionId);
      if (!session) return;
      let appliedCount = 0;
      let interrupted = false;

      for (const fileEntry of session.files) {
        const result = await _uploadSingleFile.call(this, session, fileEntry.id);
        if (result === 'ignored') {
          interrupted = true;
          break;
        }
        if (result === 'applied') appliedCount++;
      }

      if (appliedCount > 0 && !interrupted && this.currentProjectId === projectId) {
        this.showToast(this.t('toast.sourcesAdded'), 'success');
        _scheduleConsigneRefresh.call(this, projectId);
      }
      _maybeCleanupSession.call(this, sessionId);
    },

    async retryFile(this: AppContext, sessionId: string, fileId: string) {
      const session = this.uploadSessions.find((s: UploadSession) => s.id === sessionId);
      if (!session) return;
      const file = session.files.find((f: UploadFile) => f.id === fileId);
      if (file?.status !== 'error') return;

      const result = await _uploadSingleFile.call(this, session, fileId);
      if (result === 'applied') {
        this.showToast(this.t('toast.sourcesAdded'), 'success');
        _scheduleConsigneRefresh.call(this, session.projectId);
      }
      _maybeCleanupSession.call(this, sessionId);
    },

    dismissFailedFile(this: AppContext, sessionId: string, fileId: string) {
      const session = this.uploadSessions.find((s: UploadSession) => s.id === sessionId);
      if (!session) return;
      const file = session.files.find((f: UploadFile) => f.id === fileId);
      if (file?.status !== 'error') return;

      session.files = session.files.filter((f: UploadFile) => f.id !== fileId);
      if (session.files.length === 0) {
        this.uploadSessions = this.uploadSessions.filter((s: UploadSession) => s.id !== sessionId);
      } else {
        _maybeCleanupSession.call(this, sessionId);
      }
      this.$nextTick(() => this.refreshIcons());
    },

    async addText(this: AppContext) {
      const text = this.textInput.trim();
      const projectId = this.currentProjectId;
      if (!text || !projectId) return;

      const sessionId = crypto.randomUUID();
      this.uploadSessions.push({
        id: sessionId,
        projectId,
        cleanupScheduled: false,
        files: [
          {
            id: crypto.randomUUID(),
            name: 'text',
            file: null,
            status: 'uploading' as const,
            errorMsg: null,
          },
        ],
      });
      const session = this.uploadSessions.find((s: UploadSession) => s.id === sessionId);
      if (!session) return;

      try {
        const res = await fetch(this.apiBase() + '/sources/text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, lang: this.locale }),
        });
        if (!_isSessionActive(this, session)) return;
        if (!res.ok) {
          const err = await res.json();
          if (!_isSessionActive(this, session)) return;
          this.showToast(
            this.t('toast.error', { error: this.resolveError(err.error || res.statusText) }),
            'error',
          );
          return;
        }
        const source = await res.json();
        if (!_isSessionActive(this, session)) return;
        this.sources.push(source);
        this.selectedIds.push(source.id);
        this.textInput = '';
        this.showTextInput = false;
        this.showToast(this.t('toast.textAdded'), 'success');
        this.$nextTick(() => this.refreshIcons());
        setTimeout(() => {
          if (_isSessionActive(this, session)) this.refreshModeration();
        }, 2000);
      } catch (e: unknown) {
        if (!_isSessionActive(this, session)) return;
        const msg = e instanceof Error ? e.message : String(e);
        this.showToast(this.t('toast.error', { error: msg }), 'error', () => this.addText());
      } finally {
        this.uploadSessions = this.uploadSessions.filter((s: UploadSession) => s.id !== sessionId);
      }
    },

    async deleteSource(this: AppContext, id: string) {
      await fetch(this.apiBase() + '/sources/' + id, { method: 'DELETE' });
      this.sources = this.sources.filter((s: Source) => s.id !== id);
      this.selectedIds = this.selectedIds.filter((sid: string) => sid !== id);
      this.showToast(this.t('toast.sourceDeleted'), 'info');
    },

    openSourceDialog(this: AppContext, src: Source) {
      this.viewSource = src;
      this.viewSourceMode = 'ocr';
      this.viewSourceZoom = 1;
      this.viewSourceRotation = this.viewSourceRotations[src.id] || 0;
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
      const dialog = document.querySelector('[x-ref="sourceDialog"]') as HTMLDialogElement;
      if (dialog) dialog.showModal();
      this.$nextTick(() => this.refreshIcons());
    },

    zoomIn(this: AppContext) {
      this.viewSourceZoom = Math.min(3, this.viewSourceZoom + 0.25);
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
    },
    zoomOut(this: AppContext) {
      this.viewSourceZoom = Math.max(0.5, this.viewSourceZoom - 0.25);
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
    },
    resetZoom(this: AppContext) {
      this.viewSourceZoom = 1;
      this.viewSourceRotation = 0;
      if (this.viewSource) delete this.viewSourceRotations[this.viewSource.id];
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
    },
    rotateLeft(this: AppContext) {
      this.viewSourceRotation -= 90;
      this.viewSourceRotations[this.viewSource.id] = this.viewSourceRotation;
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
    },
    rotateRight(this: AppContext) {
      this.viewSourceRotation += 90;
      this.viewSourceRotations[this.viewSource.id] = this.viewSourceRotation;
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
    },

    startDrag(this: AppContext, e: MouseEvent | TouchEvent) {
      if (this.viewSourceZoom <= 1 && this.viewSourceRotation % 360 === 0) return;
      this.viewSourceDragging = true;
      const point = 'touches' in e ? e.touches[0] : e;
      this.viewSourceDragStart = { x: point.clientX, y: point.clientY };
      this.viewSourcePanStart = { x: this.viewSourcePanX, y: this.viewSourcePanY };
      e.preventDefault();
    },
    onDrag(this: AppContext, e: MouseEvent | TouchEvent) {
      if (!this.viewSourceDragging) return;
      const point = 'touches' in e ? e.touches[0] : e;
      this.viewSourcePanX =
        this.viewSourcePanStart.x + (point.clientX - this.viewSourceDragStart.x);
      this.viewSourcePanY =
        this.viewSourcePanStart.y + (point.clientY - this.viewSourceDragStart.y);
      e.preventDefault();
    },
    stopDrag(this: AppContext) {
      this.viewSourceDragging = false;
    },

    closeSourceDialog(this: AppContext) {
      (this.$refs.sourceDialog as HTMLDialogElement | undefined)?.close();
      this.viewSource = null;
    },

    async refreshModeration(this: AppContext, retries = 3) {
      if (!this.currentProjectId) return;
      try {
        const res = await fetch('/api/projects/' + this.currentProjectId);
        if (res.ok) {
          const project = await res.json();
          for (const src of project.sources as Source[]) {
            if (src.moderation) {
              const local = this.sources.find((s: Source) => s.id === src.id);
              if (local) local.moderation = src.moderation;
            }
          }
          this.$nextTick(() => this.refreshIcons());
          const hasPending = this.sources.some((s: Source) => s.moderation?.status === 'pending');
          if (hasPending && retries > 0) {
            setTimeout(() => this.refreshModeration(retries - 1), 3000);
          }
        }
      } catch (e) {
        console.error('[sources] refreshModeration failed:', e);
      }
    },
  };
}
