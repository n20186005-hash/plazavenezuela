#!/usr/bin/env bash
set -euo pipefail

rm -rf node_modules dist
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build

if [[ -f pnpm-workspace.yaml ]]; then
  python - <<'PY'
from pathlib import Path
text = Path('pnpm-workspace.yaml').read_text(encoding='utf-8')
if 'packages:' not in text or "'.'" not in text and '"."' not in text and '- .' not in text:
    raise SystemExit('pnpm-workspace.yaml no contiene packages con el paquete raíz.')
PY
fi

if grep -RniE 'example\.com|localhost|chrome-extension://' dist; then
  echo 'Se detectó contenido de relleno o ilegal en dist.' >&2
  exit 1
fi


if find dist -maxdepth 1 -type f -name 'sitemap*.xml' | grep -q .; then
  if grep -Rni '<lastmod>' dist/sitemap*.xml; then
    echo 'El sitemap contiene lastmod; revisa que no sea inventado.' >&2
    exit 1
  fi
fi

echo 'Verificación final completada.'
