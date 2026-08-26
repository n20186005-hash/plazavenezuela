import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ÚNICO punto de configuración del dominio.
// Déjalo vacío hasta tener el dominio final. Ej.: 'https://tudominio.ve'
const SITE_URL = '';

export default defineConfig({
  site: SITE_URL || undefined,
  integrations: SITE_URL ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
