# Estado de validación

## Comprobaciones estáticas realizadas

- `package.json`, `wrangler.jsonc` y `site.webmanifest`: JSON válido.
- `favicon.svg`: XML válido.
- `astro.config.mjs`: sintaxis JavaScript válida mediante `node --check`.
- `src/data/site.ts`: comprobación TypeScript básica superada con el compilador disponible en el entorno.
- No existe `pnpm-workspace.yaml`, por lo que el proyecto se mantiene como paquete único.
- No se encontraron `example.com`, `localhost`, `chrome-extension://`, `zh-CN`, `zh_CN` ni referencias a Baguio en las fuentes del sitio.
- No se encontró texto CJK en las páginas, componentes o recursos públicos: la interfaz es íntegramente `es-VE`.
- Logo y favicons locales presentes en SVG, 16×16, 32×32 y 180×180.

## Bloqueo de la verificación de dependencias

El entorno de ejecución utilizado para preparar este paquete no puede resolver `registry.npmjs.org` (`EAI_AGAIN`) y solo dispone localmente de Node.js 22.16.0, mientras el proyecto fija Node.js 24.19.0 LTS. Tampoco existe una caché local de pnpm/Astro que permita una instalación sin red.

Por ese motivo, **no se ha fabricado un `pnpm-lock.yaml` ni se declara como superada una instalación/build que no pudo ejecutarse**. El paquete no debe considerarse liberación final hasta ejecutar en un entorno con acceso al registro:

```bash
corepack enable
corepack prepare pnpm@11.24.0 --activate
pnpm install
# conservar el pnpm-lock.yaml generado
rm -rf node_modules dist
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
./scripts/verify-release.sh
```

Tras generar el lockfile, debe quedar incluido en el control de versiones junto con `package.json`.

## Fotografías

Las tres fotografías documentales son reales y cuentan con atribución CC BY-SA 3.0. El entorno tampoco permite descargar sus binarios desde Wikimedia Commons, por lo que esta entrega las referencia desde Wikimedia. En una red habilitada conviene descargarlas a `public/images/`, conservar la atribución y sustituir las tres rutas en `src/data/site.ts` para cumplir al máximo la preferencia de recursos locales.
