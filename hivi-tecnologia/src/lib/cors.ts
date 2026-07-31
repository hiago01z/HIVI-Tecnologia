const ALLOWED_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hivi.com.br').replace(/\/$/, '');

/** Add to admin API responses to prevent CDN/proxy caching of sensitive data. */
export const NO_CACHE: Record<string, string> = { 'Cache-Control': 'no-store, private' };

/**
 * Returns CORS headers for same-site API routes.
 * Only the project's own origin is allowed — never reflects arbitrary Origin values.
 */
export function buildCorsHeaders(requestOrigin: string | null): Record<string, string> {
  const base: Record<string, string> = { Vary: 'Origin' };

  // Same-origin requests (no Origin header) and the known site origin are allowed.
  // Any other origin gets no ACAO header, so browsers block the response.
  if (!requestOrigin || requestOrigin === ALLOWED_ORIGIN) {
    base['Access-Control-Allow-Origin'] = ALLOWED_ORIGIN;
    base['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, DELETE, OPTIONS';
    base['Access-Control-Allow-Headers'] = 'Content-Type';
    base['Access-Control-Max-Age'] = '86400';
  }

  return base;
}

/** Responds to OPTIONS preflight. */
export function handlePreflight(requestOrigin: string | null): Response {
  return new Response(null, {
    status: 204,
    headers: buildCorsHeaders(requestOrigin),
  });
}
