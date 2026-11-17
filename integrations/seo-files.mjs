import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Páginas fora do sitemap (404 e arquivos internos/vitrine técnica).
const EXCLUDE = new Set(['404/', '404.html', 'design-showcase.html']);

/**
 * Gera sitemap.xml e robots.txt no build, a partir do `site` do astro.config.
 * @returns {import('astro').AstroIntegration}
 */
export default function seoFiles() {
  /** @type {string | undefined} */
  let site;

  return {
    name: 'seo-files',
    hooks: {
      'astro:config:done': ({ config }) => {
        site = config.site;
      },
      'astro:build:done': async ({ dir, pages, logger }) => {
        if (!site) {
          logger.warn('`site` não configurado — sitemap.xml/robots.txt não gerados.');
          return;
        }
        const base = site.endsWith('/') ? site : `${site}/`;
        const lastmod = new Date().toISOString();

        // Normaliza pathnames suportando string ou objeto ({ pathname })
        const pageList = pages
          .map((p) => (typeof p === 'string' ? p : p.pathname))
          .map((p) => p.replace(/^\/+/, ''))
          .filter((pathname) => !EXCLUDE.has(pathname));

        // Ordena garantindo a página inicial (raiz) no topo
        pageList.sort((a, b) => {
          if (a === '' || a === '/') return -1;
          if (b === '' || b === '/') return 1;
          return a.localeCompare(b);
        });

        const urls = pageList
          .map(
            (pathname) =>
              `  <url>\n    <loc>${base}${pathname}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
          )
          .join('\n');

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        const robots = `User-agent: *\nAllow: /\nDisallow: /design-showcase.html\n\nSitemap: ${base}sitemap.xml\n`;

        await writeFile(fileURLToPath(new URL('./sitemap.xml', dir)), sitemap, 'utf-8');
        await writeFile(fileURLToPath(new URL('./robots.txt', dir)), robots, 'utf-8');
        logger.info('sitemap.xml e robots.txt gerados com sucesso.');
      },
    },
  };
}
