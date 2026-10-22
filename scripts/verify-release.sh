#!/usr/bin/env bash
set -euo pipefail
# Validate existing installed dependencies without deleting or reinstalling them.
pnpm check
pnpm build
node scripts/behavior-test.mjs
node scripts/weather-test.mjs
node scripts/verify-build.mjs
