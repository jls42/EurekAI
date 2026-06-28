import { addCostDelta } from './cost-utils';
import { withAiHeaders } from './ai-fetch';
import { hashFile, findExistingDuplicate } from './source-dedup';
import type { AppContext, AppState } from './app-context';
import type { Source } from '../../types';

type UploadResult = 'applied' | 'ignored' | 'failed' | 'duplicate';
type UploadSession = AppState['uploadSessions'][number];
type UploadFile = UploadSession['files'][number];

const TOAST_ERROR = 'toast.error';

export function _isSessionActive(ctx: AppContext, session: UploadSession): boolean {
  return (
    ctx.uploadSessions.some((s: UploadSession) => s.id === session.id) &&
    ctx.currentProjectId === session.projectId
  );
}

export const _resolveHttpError = async (
  ctx: AppContext,
  session: UploadSession,
  res: Response,
): Promise<string | null> => {
  try {
    const err = await res.json();
    if (!_isSessionActive(ctx, session)) return null;
    return ctx.resolveError(err.error || res.statusText);
  } catch {
    if (!_isSessionActive(ctx, session)) return null;
    return res.statusText;
  }
};

export function _applyUploadSuccess(
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

export const _handleUploadHttpError = async (
  ctx: AppContext,
  session: UploadSession,
  file: UploadFile,
  res: Response,
): Promise<UploadResult> => {
  const resolved = await _resolveHttpError(ctx, session, res);
  if (resolved === null) return 'ignored';
  file.status = 'error';
  file.errorMsg = resolved;
  ctx.$nextTick(() => ctx.refreshIcons());
  ctx.showToast(ctx.t(TOAST_ERROR, { error: resolved }), 'error');
  return 'failed';
};

export function _handleUploadException(
  ctx: AppContext,
  session: UploadSession,
  file: UploadFile,
  e: unknown,
): UploadResult {
  if (!_isSessionActive(ctx, session)) return 'ignored';
  console.error('[sources:upload]', file.name, e);
  file.status = 'error';
  file.errorMsg = ctx.t('sources.uploadError.generic');
  ctx.$nextTick(() => ctx.refreshIcons());
  ctx.showToast(ctx.t('toast.uploadError', { filename: file.name }), 'error');
  return 'failed';
}

export const _uploadSingleFile = async function (
  this: AppContext,
  session: UploadSession,
  fileId: string,
): Promise<UploadResult> {
  if (!_isSessionActive(this, session)) return 'ignored';
  const file = session.files.find((f: UploadFile) => f.id === fileId);
  if (!file?.file) return 'ignored';

  // Re-upload d'un fichier déjà marqué doublon = décision explicite « Importer quand même ».
  const forced = file.status === 'duplicate';
  file.status = 'uploading';
  file.errorMsg = null;
  this.$nextTick(() => this.refreshIcons());

  const formData = new FormData();
  formData.append('files', file.file, file.name);
  formData.append('lang', this.locale);
  if (forced) formData.append('allowDuplicates', 'true');

  try {
    const res = await fetch(
      `/api/projects/${session.projectId}/sources/upload`,
      withAiHeaders({ method: 'POST', body: formData }),
    );
    if (!_isSessionActive(this, session)) return 'ignored';
    return await _handleUploadResponse(this, session, file, res);
  } catch (e: unknown) {
    return _handleUploadException(this, session, file, e);
  }
};

// Garde serveur : réponse { sources, failures, duplicates } quand le fichier est un doublon (OCR
// skippé). Sinon array nu (full success). On normalise AVANT le push (spread d'un objet = crash).
const _handleUploadResponse = async (
  ctx: AppContext,
  session: UploadSession,
  file: UploadFile,
  res: Response,
): Promise<UploadResult> => {
  if (!res.ok) return _handleUploadHttpError(ctx, session, file, res);
  const payload = await res.json();
  if (!_isSessionActive(ctx, session)) return 'ignored';
  if (_responseHasDuplicate(payload, file.name)) {
    file.status = 'duplicate';
    ctx.$nextTick(() => ctx.refreshIcons());
    return 'duplicate';
  }
  _applyUploadSuccess(ctx, session, file, _extractSources(payload));
  return 'applied';
};

/** Réponse upload normalisée : array nu (full success) ou objet { sources, failures, duplicates }. */
function _extractSources(payload: unknown): Source[] {
  if (Array.isArray(payload)) return payload as Source[];
  return (payload as { sources?: Source[] }).sources ?? [];
}

function _responseHasDuplicate(payload: unknown, filename: string): boolean {
  if (Array.isArray(payload)) return false;
  const dups = (payload as { duplicates?: Array<{ filename: string }> }).duplicates ?? [];
  return dups.some((d) => d.filename === filename);
}

export function _createUploadSession(
  ctx: AppContext,
  fileList: FileList,
  projectId: string,
): UploadSession | null {
  const sessionId = crypto.randomUUID();
  const files = Array.from(fileList).map((f) => ({
    id: crypto.randomUUID(),
    name: f.name,
    file: f,
    status: 'pending' as const,
    errorMsg: null as string | null,
  }));
  ctx.uploadSessions.push({ id: sessionId, projectId, files, cleanupScheduled: false });
  ctx.$nextTick(() => ctx.refreshIcons());
  return ctx.uploadSessions.find((s: UploadSession) => s.id === sessionId) ?? null;
}

export const _runUploadLoop = async (
  ctx: AppContext,
  session: UploadSession,
): Promise<{ applied: number; interrupted: boolean }> => {
  let applied = 0;
  let interrupted = false;
  for (const fileEntry of session.files) {
    // Pré-check client : un doublon déjà détecté n'est PAS uploadé (zéro coût OCR). L'utilisateur le
    // force via « Importer quand même » (retryFile) qui rappelle _uploadSingleFile avec allowDuplicates.
    if (fileEntry.status === 'duplicate') continue;
    const result = await _uploadSingleFile.call(ctx, session, fileEntry.id);
    if (result === 'ignored') {
      interrupted = true;
      break;
    }
    if (result === 'applied') applied++;
  }
  return { applied, interrupted };
};

/**
 * Pré-check client (best-effort) : hash chaque fichier et marque 'duplicate' ceux qui dupliquent une
 * source existante ou un fichier antérieur du même lot. Statut transitoire 'hashing' pendant le calcul.
 * Si `crypto.subtle` est absent (hash null), aucun marquage : le garde serveur prend le relais.
 */
export const _markClientDuplicates = async (
  ctx: AppContext,
  session: UploadSession,
): Promise<void> => {
  const seen = new Set<string>();
  for (const f of session.files) {
    if (!f.file) continue;
    f.status = 'hashing';
    ctx.$nextTick(() => ctx.refreshIcons());
    const hash = await hashFile(f.file);
    if (!_isSessionActive(ctx, session)) return;
    const existing = findExistingDuplicate(hash, f.name, ctx.sources);
    const intraBatch = hash ? seen.has(hash) : false;
    if (existing || intraBatch) {
      f.status = 'duplicate';
    } else {
      f.status = 'pending';
      if (hash) seen.add(hash);
    }
  }
  ctx.$nextTick(() => ctx.refreshIcons());
};

function _notifyDuplicates(ctx: AppContext, session: UploadSession): void {
  const n = session.files.filter((f: UploadFile) => f.status === 'duplicate').length;
  if (n > 0) ctx.showToast(ctx.t('sources.duplicateWarning', { n: String(n) }), 'warning');
}

export function _maybeFinalizeUpload(
  ctx: AppContext,
  applied: number,
  interrupted: boolean,
  projectId: string,
): void {
  if (applied > 0 && !interrupted && ctx.currentProjectId === projectId) {
    ctx.showToast(ctx.t('toast.sourcesAdded'), 'success');
    _scheduleConsigneRefresh.call(ctx, projectId);
  }
}

export function _scheduleConsigneRefresh(this: AppContext, projectId: string) {
  setTimeout(() => {
    if (this.currentProjectId === projectId) this.refreshConsigne();
  }, 3000);
}

export function _maybeCleanupSession(this: AppContext, sessionId: string) {
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

// ─────────────────────────────────────────────────────────────────────────────
// Helpers extraits de createSources.addText pour rester sous CCN 8 (Lizard).
// ─────────────────────────────────────────────────────────────────────────────

const startAddTextSession = function (state: AppContext, projectId: string): UploadSession | null {
  const sessionId = crypto.randomUUID();
  state.uploadSessions.push({
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
  return state.uploadSessions.find((s: UploadSession) => s.id === sessionId) ?? null;
};

const handleAddTextResponse = async function (
  state: AppContext,
  session: UploadSession,
  res: Response,
): Promise<void> {
  if (!_isSessionActive(state, session)) return;
  if (!res.ok) {
    const err = await res.json();
    if (!_isSessionActive(state, session)) return;
    state.showToast(
      state.t(TOAST_ERROR, { error: state.resolveError(err.error || res.statusText) }),
      'error',
    );
    return;
  }
  const source = await res.json();
  if (!_isSessionActive(state, session)) return;
  state.sources.push(source);
  state.selectedIds.push(source.id);
  state.textInput = '';
  state.showTextInput = false;
  state.showToast(state.t('toast.textAdded'), 'success');
  state.$nextTick(() => state.refreshIcons());
  setTimeout(() => {
    if (_isSessionActive(state, session)) state.refreshModeration();
  }, 2000);
};

const runAddText = async function (state: AppContext): Promise<void> {
  const text = state.textInput.trim();
  const projectId = state.currentProjectId;
  if (!text || !projectId) return;
  const session = startAddTextSession(state, projectId);
  if (!session) return;
  try {
    const res = await fetch(
      state.apiBase() + '/sources/text',
      withAiHeaders({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang: state.locale }),
      }),
    );
    await handleAddTextResponse(state, session, res);
  } catch (e: unknown) {
    if (!_isSessionActive(state, session)) return;
    const msg = e instanceof Error ? e.message : String(e);
    state.showToast(state.t(TOAST_ERROR, { error: msg }), 'error', () => state.addText());
  } finally {
    state.uploadSessions = state.uploadSessions.filter((s: UploadSession) => s.id !== session.id);
  }
};

export function createSources() {
  return {
    handleDrop(this: AppContext, e: DragEvent) {
      this.dragging = false;
      this.handleFiles(e.dataTransfer?.files);
    },

    async handleFiles(this: AppContext, fileList: FileList | undefined | null) {
      const projectId = this.currentProjectId;
      if (!fileList || fileList.length === 0 || !projectId) return;
      const session = _createUploadSession(this, fileList, projectId);
      if (!session) return;
      await _markClientDuplicates(this, session);
      if (!_isSessionActive(this, session)) return;
      const { applied, interrupted } = await _runUploadLoop(this, session);
      _notifyDuplicates(this, session);
      _maybeFinalizeUpload(this, applied, interrupted, projectId);
      _maybeCleanupSession.call(this, session.id);
    },

    async retryFile(this: AppContext, sessionId: string, fileId: string) {
      const session = this.uploadSessions.find((s: UploadSession) => s.id === sessionId);
      if (!session) return;
      const file = session.files.find((f: UploadFile) => f.id === fileId);
      if (file?.status !== 'error' && file?.status !== 'duplicate') return;

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
      if (file?.status !== 'error' && file?.status !== 'duplicate') return;

      session.files = session.files.filter((f: UploadFile) => f.id !== fileId);
      if (session.files.length === 0) {
        this.uploadSessions = this.uploadSessions.filter((s: UploadSession) => s.id !== sessionId);
      } else {
        _maybeCleanupSession.call(this, sessionId);
      }
      this.$nextTick(() => this.refreshIcons());
    },

    async addText(this: AppContext) {
      await runAddText(this);
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
      if (!this.viewSource) return;
      this.viewSourceRotation -= 90;
      this.viewSourceRotations[this.viewSource.id] = this.viewSourceRotation;
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
    },
    rotateRight(this: AppContext) {
      if (!this.viewSource) return;
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
      await runRefreshModeration(this, retries);
    },
  };
}

const mergeServerModeration = function (state: AppContext, serverSources: Source[]): void {
  for (const src of serverSources) {
    if (!src.moderation) continue;
    const local = state.sources.find((s: Source) => s.id === src.id);
    if (local) local.moderation = src.moderation;
  }
};

const runRefreshModeration = async function (state: AppContext, retries: number): Promise<void> {
  if (!state.currentProjectId) return;
  try {
    // projectId vient de currentProjectId (state interne), pas d'input user direct.
    // Pas de whitelist applicable (set d'IDs dynamique). Pattern préexistant à
    // l'extraction de runRefreshModeration ; le taint analysis Codacy re-flag
    // après refactor (cf. CLAUDE.md effet secondaire taint sur cleanup).
    // nosemgrep
    const res = await fetch('/api/projects/' + state.currentProjectId);
    if (!res.ok) return;
    const project = await res.json();
    mergeServerModeration(state, project.sources as Source[]);
    state.$nextTick(() => state.refreshIcons());
    const hasPending = state.sources.some((s: Source) => s.moderation?.status === 'pending');
    if (hasPending && retries > 0) {
      setTimeout(() => state.refreshModeration(retries - 1), 3000);
    }
  } catch (e) {
    console.error('[sources] refreshModeration failed:', e);
  }
};
