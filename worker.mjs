const HOST = 'plazavenezuela.org';
const hasExt = (pathname) => /\.[a-zA-Z0-9]+$/.test(pathname);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol !== 'https:' || url.hostname === `www.${HOST}`) {
      url.protocol = 'https:';
      url.hostname = HOST;
      url.port = '';
      return Response.redirect(url.href, 301);
    }
    // Normalize trailing slash for content paths (all pre-rendered pages use trailing slash).
    if (!hasExt(url.pathname) && !url.pathname.endsWith('/')) {
      url.pathname += '/';
      return Response.redirect(url.href, 301);
    }
    const errorAlias = /^\/404(?:\.html)?\/?$/.test(url.pathname);
    const assetURL = new URL(request.url);
    if (errorAlias) assetURL.pathname = '/__missing_error_page__';
    const response = await env.ASSETS.fetch(new Request(assetURL, request));
    if (response.status === 404 || errorAlias) {
      const headers = new Headers(response.headers);
      headers.set('X-Robots-Tag', 'noindex');
      return new Response(request.method === 'HEAD' ? null : response.body, { status: 404, headers });
    }
    return response;
  }
};
