#!/bin/bash -l
set -euo pipefail

# 와랑스튜디오 배포 (로컬 빌드 → msm VM standalone rsync → PM2 재시작). 서버에서 빌드하거나 npm install 하지 않는다.
# 수동 tar/scp 금지 — 이 스크립트만 쓴다. 다른 서비스 배포와 동시에 돌리지 않는다(VM 메모리가 빠듯하다).
#   DRY_RUN=1 ./deploy.sh        # 서버에 쓰지 않고 삭제 대상만 보여 준다
#   WARANG_SPECIAL_ID=9 ./deploy.sh   # AIM Special 번호를 서버 프로세스 환경에 반영(없으면 기존 값 유지)
cd "$(dirname "$0")"

SSH_KEY="$HOME/.ssh/msm_ci"
SSH_TARGET="ubuntu@34.64.111.65"
REMOTE_DIR="/home/ubuntu/apps/warang_frontend"
PORT=3010
SSH="ssh -i $SSH_KEY"

echo "▶ 빌드(이미지 변환 포함)"
npm run build

# 제외: .env(서버 전용), public/·.next/static/·.next/cache/(아래에서 따로 맞추거나 서버가 만든 캐시),
#       sharp·@img(macOS 바이너리 — 이 사이트는 이미지 최적화를 쓰지 않는다)
EXCLUDES=(--exclude='.env' --exclude='public/' --exclude='.next/static/' --exclude='.next/cache/' --exclude='node_modules/sharp' --exclude='node_modules/@img')

if [ "${DRY_RUN:-}" = "1" ]; then
  echo "▶ [DRY RUN] 삭제 대상(없어야 정상):"
  $SSH "$SSH_TARGET" "mkdir -p $REMOTE_DIR"
  rsync -azn --delete "${EXCLUDES[@]}" -e "$SSH" .next/standalone/ "$SSH_TARGET:$REMOTE_DIR/" | grep deleting || echo "  (없음)"
  exit 0
fi

echo "▶ 서버 폴더 준비"
$SSH "$SSH_TARGET" "mkdir -p $REMOTE_DIR"

echo "▶ standalone 서버 코드 동기화"
rsync -az --delete "${EXCLUDES[@]}" -e "$SSH" .next/standalone/ "$SSH_TARGET:$REMOTE_DIR/"

echo "▶ 정적 자산(.next/static) 동기화"
rsync -az --delete -e "$SSH" .next/static/ "$SSH_TARGET:$REMOTE_DIR/.next/static/"

echo "▶ public 동기화"
rsync -az --delete -e "$SSH" public/ "$SSH_TARGET:$REMOTE_DIR/public/"

echo "▶ PM2 시작/재시작 (PORT·HOSTNAME 명시 필수 — .env를 읽지 않는다)"
$SSH "$SSH_TARGET" "export AIM_API_BASE=\${AIM_API_BASE:-https://nemoneai.com/api}; export WARANG_SPECIAL_ID='${WARANG_SPECIAL_ID:-}'; \
  if pm2 describe warang_frontend >/dev/null 2>&1; then \
    if [ -n \"\$WARANG_SPECIAL_ID\" ]; then pm2 restart warang_frontend --update-env >/dev/null; else pm2 restart warang_frontend >/dev/null; fi; \
  else cd $REMOTE_DIR && PORT=$PORT HOSTNAME=127.0.0.1 pm2 start server.js --name warang_frontend >/dev/null; fi; pm2 save >/dev/null"

echo "✅ 와랑 배포 완료: $(date)"
