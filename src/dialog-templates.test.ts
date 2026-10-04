/* eslint-disable
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-assignment
   --
   Codacy lance ESLint sans les types Vitest; lint:ci local reste type-aware. */
// Verrou statique des dialogues (lecture du HTML, sans navigateur) : un champ qui valide sur
// Entrée et ferme son dialogue rend le focus au bouton qui l'a ouvert ; sans `.prevent` sur le
// keydown, le keypress d'Entrée qui suit active ce bouton et rouvre le dialogue (vu au
// release-test du 2026-10-04 : demande de PIN rouverte aussitôt après validation).
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';

const partials = new URL('./partials/', import.meta.url);
const dialogs = readdirSync(partials).filter((name) => /^dialog-.+\.html$/.test(name));
const ENTER_HANDLER = /@keydown\.enter((?:\.[a-z]+)*)=/g;

describe('dialogues : Entrée qui valide un champ', () => {
  it('trouve les gabarits de dialogue', () => {
    expect(dialogs).toContain('dialog-pin.html');
  });

  it.each(dialogs)('%s : tout @keydown.enter porte .prevent', (name) => {
    const html = readFileSync(new URL(name, partials), 'utf-8');
    const withoutPrevent = [...html.matchAll(ENTER_HANDLER)]
      .filter(([, modifiers]) => !modifiers.split('.').includes('prevent'))
      .map(([handler]) => handler);
    expect(withoutPrevent).toEqual([]);
  });

  it('la demande de PIN valide sur Entrée sans propager le keypress', () => {
    const html = readFileSync(new URL('dialog-pin.html', partials), 'utf-8');
    expect(html).toContain('@keydown.enter.prevent="submitPinVerify()"');
  });
});
