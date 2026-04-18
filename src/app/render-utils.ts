const UNSAFE_PROTOCOL_RE = /^(?:javascript|vbscript|data):/i;
const EXPLICIT_PROTOCOL_RE = /^[a-z][a-z0-9+.-]*:/i;
const BLOCKED_TAG_RE =
  /<\/?(?:script|style|iframe|object|embed|link|meta|form|input|textarea|select|option)[^>]*>/gi;
// eslint-disable-next-line sonarjs/slow-regex -- AI-generated HTML (Mistral), not user-controlled (voir NOSONAR S5852)
const EVENT_HANDLER_RE = /\s+on[a-z-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi; // NOSONAR(S5852) — input is AI-generated HTML (Mistral), not user-controlled
// eslint-disable-next-line sonarjs/slow-regex -- AI-generated HTML (Mistral), not user-controlled (voir NOSONAR S5852)
const STYLE_ATTR_RE = /\s+style\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi; // NOSONAR(S5852) — input is AI-generated HTML (Mistral), not user-controlled
// eslint-disable-next-line sonarjs/slow-regex -- AI-generated HTML (Mistral), not user-controlled (voir NOSONAR S5852)
const URL_ATTR_RE = /\s+(href|src|xlink:href)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi; // NOSONAR(S5852) — input is AI-generated HTML (Mistral), not user-controlled

export function escapeMarkdownHtml(content: string): string {
  return content.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function escapeHtmlAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function decodeUrlEntities(value: string): string {
  return value
    .replaceAll(/&Tab;/gi, '')
    .replaceAll(/&NewLine;/gi, '')
    .replaceAll(/&#(?:x0*9|9);?/gi, '')
    .replaceAll(/&#(?:x0*a|10);?/gi, '')
    .replaceAll(/&#(?:x0*d|13);?/gi, '')
    .trim();
}

function isSafeUrl(value: string): boolean {
  if (!value) return true;
  const normalized = decodeUrlEntities(value)
    // eslint-disable-next-line no-control-regex -- intentional strip of ASCII control chars from URLs (security hardening)
    .replaceAll(/[\u0000-\u0020\u007F]+/g, '')
    .toLowerCase();

  if (!normalized) return true;
  if (
    normalized.startsWith('#') ||
    normalized.startsWith('/') ||
    normalized.startsWith('./') ||
    normalized.startsWith('../') ||
    normalized.startsWith('?')
  ) {
    return true;
  }

  if (UNSAFE_PROTOCOL_RE.test(normalized)) return false;
  if (!EXPLICIT_PROTOCOL_RE.test(normalized)) return true;
  return /^(?:https?:|mailto:|tel:)/i.test(normalized);
}

export function sanitizeRenderedHtml(html: string): string {
  let safe = html.replaceAll(BLOCKED_TAG_RE, '');
  safe = safe.replaceAll(EVENT_HANDLER_RE, '');
  safe = safe.replaceAll(STYLE_ATTR_RE, '');
  safe = safe.replaceAll(
    URL_ATTR_RE,
    (_match, attr: string, dq?: string, sq?: string, bare?: string) => {
      const raw = dq ?? sq ?? bare ?? '';
      if (!isSafeUrl(raw)) return '';
      return ` ${attr}="${escapeHtmlAttribute(raw)}"`;
    },
  );
  safe = safe.replaceAll(/<a\b(?![^>]*\brel=)([^>]*)>/gi, '<a$1 rel="noopener noreferrer">');
  return safe;
}
