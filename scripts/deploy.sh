#!/usr/bin/env bash
# Deploy no servidor próprio (Apache). Roda NO SERVIDOR, dentro do clone do repositório:
#
#   npm run deploy
#
# Passos: atualiza o código (git pull) → instala dependências → lint e testes →
# build (com pré-renderização) → publica dist/ na pasta que o Apache serve.
# Se qualquer passo falhar, o script para ANTES de publicar: o site no ar não muda.
#
# DEPLOY_DIR: pasta que o Apache serve (DocumentRoot). Vem do .env do servidor
#   (DEPLOY_DIR=...) ou da linha de comando: DEPLOY_DIR=/var/www/... npm run deploy
# SKIP_PULL=1: publica o código como está, sem git pull (para voltar uma versão).
set -euo pipefail

cd "$(dirname "$0")/.."

step() { printf '\n▸ %s\n' "$1"; }
fail() { printf '\n✖ %s\n' "$1" >&2; exit 1; }

# ---------- Conferências antes de começar ----------
[ -f .env ] || fail ".env não encontrado. Ele não vem pelo git: copie o .env.example e preencha."

if [ -z "${DEPLOY_DIR:-}" ]; then
  DEPLOY_DIR=$(grep -E '^DEPLOY_DIR=' .env | tail -1 | cut -d= -f2- | tr -d "\"'" || true)
fi
[ -n "$DEPLOY_DIR" ] || fail "Defina DEPLOY_DIR (pasta que o Apache serve) no .env ou na linha de comando."
[ -d "$DEPLOY_DIR" ] || fail "A pasta DEPLOY_DIR não existe: $DEPLOY_DIR"

# O repositório e a pasta publicada não podem estar um dentro do outro:
# o Apache passaria a servir .git/ e .env, ou o deploy apagaria o repositório.
REPO=$(pwd -P)
SITE=$(cd "$DEPLOY_DIR" && pwd -P)
case "$SITE/" in "$REPO/"*) fail "DEPLOY_DIR está dentro do repositório: $SITE" ;; esac
case "$REPO/" in "$SITE/"*) fail "O repositório está dentro de DEPLOY_DIR (exporia .git e .env): $REPO" ;; esac

# ---------- Código, dependências, qualidade e build ----------
if [ "${SKIP_PULL:-}" != 1 ]; then
  step "Atualizando o código (git pull)"
  git pull --ff-only
fi

step "Instalando dependências (npm ci)"
npm ci --no-audit --no-fund

step "Lint e testes"
npm run lint
npm test

step "Build"
npm run build
grep -q 'rel="canonical"' dist/index.html || fail "O build saiu sem canonical: confira VITE_SITE_URL no .env."

# ---------- Publicação ----------
step "Publicando em $SITE"
# 1º: arquivos novos (JS, CSS, fontes, imagens), sem o HTML. Assim, nenhuma página
#     publicada aponta para um arquivo que ainda não chegou.
rsync -a --exclude='*.html' dist/ "$SITE/"
# 2º: o HTML, apagando o que não existe mais no build.
#     .well-known/ (validação do certificado HTTPS) nunca é apagado.
rsync -a --delete --filter='P .well-known/' dist/ "$SITE/"

printf '\n✔ Publicado em %s (commit %s)\n' "$SITE" "$(git rev-parse --short HEAD)"
