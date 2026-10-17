#!/usr/bin/env bash
set -euo pipefail

cd /opt/new-api
IMG=ghcr.io/1moxun/lanxu:latest
echo "[lanxu] pulling $IMG"
docker pull "$IMG"

TS=$(date +%Y%m%d%H%M%S)
cp docker-compose.yml "docker-compose.yml.bak-$TS"

if grep -q "ghcr.io/1moxun/lanxu" docker-compose.yml; then
  echo "[lanxu] compose already points at ghcr image"
else
  sed -ri "s|(image:[[:space:]]+)(calciumion/new-api[^[:space:]]*)|\1$IMG|" docker-compose.yml || true
fi

if grep -q "ghcr.io/1moxun/lanxu" docker-compose.yml; then
  docker compose up -d
else
  echo "[lanxu] compose not updated; falling back to tag + recreate"
  docker tag "$IMG" calciumion/new-api:latest
  docker compose up -d --force-recreate new-api
fi

sleep 6
docker compose ps || true
docker inspect new-api --format "IMAGE={{.Config.Image}} ID={{.Image}}" || true
code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/ || true)
echo "[lanxu] local http code: $code"