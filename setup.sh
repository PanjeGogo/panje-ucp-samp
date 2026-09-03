#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

command -v node >/dev/null || { echo 'Node.js tidak ditemukan.'; exit 1; }
command -v npm >/dev/null || { echo 'npm tidak ditemukan.'; exit 1; }

[ -f .env ] || cp .env.example .env
echo 'Installing dependencies...'
npm install

echo
echo 'Setup selesai.'
echo '1) Isi .env'
echo '2) Import sql/schema.sql ke MySQL'
echo '3) Enable Message Content Intent di Discord Developer Portal'
echo '4) Jalankan: npm start'

auto_push="${AUTO_PUSH:-false}"
if [ "$auto_push" = "true" ]; then
  command -v git >/dev/null || { echo 'git tidak ditemukan.'; exit 1; }
  git add . && git commit -m 'chore: setup project' || true
  git push
fi
