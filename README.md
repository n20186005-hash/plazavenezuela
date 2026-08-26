# Guía Plaza Venezuela

Sitio informativo independiente y sin fines de lucro sobre Plaza Venezuela, Caracas. Proyecto de una sola página principal, con páginas legales independientes para privacidad, términos y configuración de cookies.

## Stack

- Astro 7.2.6
- Tailwind CSS 4.3.3 + `@tailwindcss/vite` 4.3.3
- TypeScript 6.0.3
- `@astrojs/check` 0.9.10
- `@astrojs/sitemap` 3.7.3
- Wrangler 4.125.0
- pnpm 11.24.0
- Node.js 24.19.0
- Cloudflare Workers Static Assets

Las versiones directas están fijadas sin rangos flotantes en `package.json`. Node y pnpm también están fijados mediante `engines`, `.node-version` y `packageManager`.

## Dominio: un único punto de configuración

Abra `astro.config.mjs` y complete únicamente:

```js
const SITE_URL = '';
```

Mientras el valor esté vacío:

- el proyecto sigue siendo compilable;
- no se emite `canonical` ni `og:url` con dominios de relleno;
- los campos URL de JSON-LD que dependen del dominio se omiten;
- `@astrojs/sitemap` permanece desactivado.

Cuando exista un dominio real, coloque allí la URL absoluta (por ejemplo, el dominio final con `https://`) y vuelva a compilar. El sitemap se habilita automáticamente y todos los URL propios derivan de `Astro.site`.

## Desarrollo

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm dev
```

## Despliegue en Cloudflare Workers

El proyecto usa generación estática de Astro y Workers Static Assets. No necesita adaptador de SSR porque no hay rutas dinámicas, base de datos ni funciones de servidor.

```bash
pnpm build
pnpm wrangler deploy
```

`wrangler.jsonc` apunta `assets.directory` a `./dist`, conforme al modelo actual de Cloudflare Workers para sitios estáticos.

## Analítica y consentimiento

GA4 (`G-HXM22WWPKP`) no se carga por defecto. Solo se inyecta después de que el usuario active la categoría **Analíticas** en `/cookies/`. La preferencia se guarda localmente con la clave `pv-cookie-preferences`.

No se instala ninguna herramienta de publicidad personalizada.

## Fotografías y licencias

Las fotos son imágenes documentales reales de Plaza Venezuela y sus obras, servidas desde Wikimedia Commons para respetar el archivo original y la atribución de licencia:

1. **Plaza Venezuela, Caracas. Venezuela** — George Miquilena — CC BY-SA 3.0.
2. **Doble Fisicromia de Carlos Cruz Diez Plaza Venezuela** — Jeragox — CC BY-SA 3.0.
3. **Abra Solar Plaza Venezuela** — Oscar Camejo — CC BY-SA 3.0.

El logo y los favicons son originales del proyecto y están incluidos localmente.

## Fuentes editoriales principales

El contenido fue contrastado con información pública y documental sobre Plaza Venezuela, entre otras fuentes:

- Ministerio del Poder Popular para el Turismo (MINTUR), referencias de arte público de Plaza Venezuela.
- Información pública municipal de Caracas y publicaciones institucionales sobre recuperación de espacios y movilidad en Plaza Venezuela.
- Archivo BAQ / documentación de la rehabilitación integral de la fuente y sus áreas de influencia.
- Información de ubicación de Google Maps y referencias de movilidad/horarios consultadas durante la elaboración.
- Wikimedia Commons para fotografías documentales y metadatos de autor/licencia.

Los horarios, recorridos y servicios urbanos son datos susceptibles de cambio y el sitio los presenta con advertencias de verificación.

## Estructura

- `/` — guía principal
- `/privacidad/` — política de privacidad
- `/terminos/` — términos de servicio
- `/cookies/` — configuración de cookies

## Verificación recomendada antes de producción

```bash
rm -rf node_modules
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
grep -RniE 'example\\.com|localhost|chrome-extension://' dist || true
```

Si `SITE_URL` está vacío, no debe existir sitemap. Si se ha configurado un dominio real, revise `dist/sitemap-*.xml` y confirme que todos los URL pertenezcan a ese dominio y que no se haya añadido `lastmod` inventado.

## Estado de esta entrega

Las comprobaciones estáticas de fuentes están documentadas en `VALIDATION.md`. El entorno donde se preparó el paquete no tuvo conectividad DNS hacia npm/Wikimedia, por lo que no fue posible generar de forma honesta el `pnpm-lock.yaml`, descargar las fotografías ni ejecutar la secuencia final de instalación congelada, `astro check` y build. No se ha simulado ni inventado el resultado de esas pruebas.
