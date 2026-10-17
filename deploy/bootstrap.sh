#!/usr/bin/env bash
set -euo pipefail
DIR=/opt/lanxu-src
if [ -d "$DIR/.git" ]; then
  cd "$DIR"
  git fetch origin -q || true
  git reset -q --hard origin/main
else
  git clone --depth 1 https://github.com/1moxun/lanxu.git "$DIR"
  cd "$DIR"
fi
bash deploy/deploy.sh