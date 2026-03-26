export function createSources() {
  return {
    handleDrop(this: any, e: DragEvent) {
      this.dragging = false;
      this.handleFiles(e.dataTransfer?.files);
    },

    async handleFiles(this: any, fileList: FileList | undefined | null) {
      if (!fileList || fileList.length === 0 || !this.currentProjectId) return;
      this.uploading = true;
      this.uploadProgress = { current: 0, total: fileList.length, filename: '' };

      for (let i = 0; i < fileList.length; i++) {
        const f = fileList[i];
        this.uploadProgress = { current: i + 1, total: fileList.length, filename: f.name };
        const formData = new FormData();
        formData.append('files', f);
        formData.append('lang', this.locale);
        try {
          const res = await fetch(this.apiBase() + '/sources/upload', {
            method: 'POST',
            body: formData,
          });
          if (!res.ok) {
            const err = await res.json();
            this.showToast(
              this.t('toast.error', { error: this.resolveError(err.error || res.statusText) }),
              'error',
            );
            continue;
          }
          const newSources = await res.json();
          this.sources.push(...newSources);
          this.selectedIds.push(...newSources.map((s: any) => s.id));
        } catch (e: any) {
          this.showToast(
            this.t('toast.uploadError', { filename: f.name, error: e.message }),
            'error',
          );
        }
      }
      this.uploading = false;
      this.uploadProgress = { current: 0, total: 0, filename: '' };
      if (this.sources.length > 0) {
        this.showToast(this.t('toast.sourcesAdded'), 'success');
      }
      this.$nextTick(() => this.refreshIcons());
      setTimeout(() => this.refreshConsigne(), 3000);
      setTimeout(() => this.refreshModeration(), 2000);
    },

    async addText(this: any) {
      const text = this.textInput.trim();
      if (!text || !this.currentProjectId) return;
      this.uploading = true;
      try {
        const res = await fetch(this.apiBase() + '/sources/text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, lang: this.locale }),
        });
        if (!res.ok) {
          const err = await res.json();
          this.showToast(
            this.t('toast.error', { error: this.resolveError(err.error || res.statusText) }),
            'error',
          );
          return;
        }
        const source = await res.json();
        this.sources.push(source);
        this.selectedIds.push(source.id);
        this.textInput = '';
        this.showTextInput = false;
        this.showToast(this.t('toast.textAdded'), 'success');
        this.$nextTick(() => this.refreshIcons());
        setTimeout(() => this.refreshModeration(), 2000);
      } catch (e: any) {
        this.showToast(this.t('toast.error', { error: e.message }), 'error', () => this.addText());
      } finally {
        this.uploading = false;
      }
    },

    async deleteSource(this: any, id: string) {
      await fetch(this.apiBase() + '/sources/' + id, { method: 'DELETE' });
      this.sources = this.sources.filter((s: any) => s.id !== id);
      this.selectedIds = this.selectedIds.filter((sid: string) => sid !== id);
      this.showToast(this.t('toast.sourceDeleted'), 'info');
    },

    openSourceDialog(this: any, src: any) {
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

    zoomIn(this: any) {
      this.viewSourceZoom = Math.min(3, this.viewSourceZoom + 0.25);
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
    },
    zoomOut(this: any) {
      this.viewSourceZoom = Math.max(0.5, this.viewSourceZoom - 0.25);
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
    },
    resetZoom(this: any) {
      this.viewSourceZoom = 1;
      this.viewSourceRotation = 0;
      if (this.viewSource) delete this.viewSourceRotations[this.viewSource.id];
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
    },
    rotateLeft(this: any) {
      this.viewSourceRotation -= 90;
      this.viewSourceRotations[this.viewSource.id] = this.viewSourceRotation;
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
    },
    rotateRight(this: any) {
      this.viewSourceRotation += 90;
      this.viewSourceRotations[this.viewSource.id] = this.viewSourceRotation;
      this.viewSourcePanX = 0;
      this.viewSourcePanY = 0;
    },

    startDrag(this: any, e: MouseEvent | TouchEvent) {
      if (this.viewSourceZoom <= 1 && this.viewSourceRotation % 360 === 0) return;
      this.viewSourceDragging = true;
      const point = 'touches' in e ? e.touches[0] : e;
      this.viewSourceDragStart = { x: point.clientX, y: point.clientY };
      this.viewSourcePanStart = { x: this.viewSourcePanX, y: this.viewSourcePanY };
      e.preventDefault();
    },
    onDrag(this: any, e: MouseEvent | TouchEvent) {
      if (!this.viewSourceDragging) return;
      const point = 'touches' in e ? e.touches[0] : e;
      this.viewSourcePanX =
        this.viewSourcePanStart.x + (point.clientX - this.viewSourceDragStart.x);
      this.viewSourcePanY =
        this.viewSourcePanStart.y + (point.clientY - this.viewSourceDragStart.y);
      e.preventDefault();
    },
    stopDrag(this: any) {
      this.viewSourceDragging = false;
    },

    closeSourceDialog(this: any) {
      this.$refs.sourceDialog?.close();
      this.viewSource = null;
    },

    async refreshModeration(this: any) {
      if (!this.currentProjectId) return;
      try {
        const res = await fetch('/api/projects/' + this.currentProjectId);
        if (res.ok) {
          const project = await res.json();
          for (const src of project.sources) {
            if (src.moderation) {
              const local = this.sources.find((s: any) => s.id === src.id);
              if (local) local.moderation = src.moderation;
            }
          }
          this.$nextTick(() => this.refreshIcons());
        }
      } catch {}
    },
  };
}
