const UNSAFE_PROTOCOL_RE = /^(?:javascript|vbscript|data):/i;
const EXPLICIT_PROTOCOL_RE = /^[a-z][a-z0-9+.-]*:/i;
const BLOCKED_TAG_RE =
  /<\/?(?:script|style|iframe|object|embed|link|meta|form|input|textarea|select|option)[^>]*>/gi;
const EVENT_HANDLER_RE = /\s+on[a-z-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const STYLE_ATTR_RE = /\s+style\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const URL_ATTR_RE = /\s+(href|src|xlink:href)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;

export function escapeMarkdownHtml(content: string): string {
  return content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function decodeUrlEntities(value: string): string {
  return value
    .replace(/&Tab;/gi, '')
    .replace(/&NewLine;/gi, '')
    .replace(/&#(?:x0*9|9);?/gi, '')
    .replace(/&#(?:x0*a|10);?/gi, '')
    .replace(/&#(?:x0*d|13);?/gi, '')
    .trim();
}

function isSafeUrl(value: string): boolean {
  if (!value) return true;
  const normalized = decodeUrlEntities(value)
    .replace(/[\u0000-\u001F\u007F\s]+/g, '')
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
  let safe = html.replace(BLOCKED_TAG_RE, '');
  safe = safe.replace(EVENT_HANDLER_RE, '');
  safe = safe.replace(STYLE_ATTR_RE, '');
  safe = safe.replace(
    URL_ATTR_RE,
    (_match, attr: string, dq?: string, sq?: string, bare?: string) => {
      const raw = dq ?? sq ?? bare ?? '';
      if (!isSafeUrl(raw)) return '';
      return ` ${attr}="${escapeHtmlAttribute(raw)}"`;
    },
  );
  safe = safe.replace(/<a\b(?![^>]*\brel=)([^>]*)>/gi, '<a$1 rel="noopener noreferrer">');
  return safe;
}
