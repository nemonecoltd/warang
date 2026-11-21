# WARANG STUDIO (warang.nemoneai.com)

와랑스튜디오 공식 사이트. Next.js 16 + Tailwind 4. 자체 백엔드·DB 없음.
- 히어로 아래 5개 카드와 SNS는 단순 링크(`src/content/links.ts`).
- "와랑에서 발견한 것들"(`/story`)만 맛매치(AIM) Special의 새 글을 가져와 보여 준다(`src/lib/aim.ts`, 5분 단위 재검증).

## 환경값 (`.env.example` 참고)
`AIM_API_BASE`, `WARANG_SPECIAL_ID`(없으면 샘플 모드), `NEXT_PUBLIC_SAMPLE`(비공개 단계만), `NEXT_PUBLIC_INDEXABLE`(기본 공개, 0이면 비공개 점검).

## 이미지
원본은 `public/images/src/{hero,future,jeju,life,plant,architecture,story,warang-story}.jpg`. **같은 이름으로 덮어쓰면 끝**이고,
`npm run images`(dev/build 전에 자동 실행)가 폭별 WebP(`public/images/gen/`)와 `src/content/image-manifest.json`을 만든다.
코드에서는 `imageProps("/images/hero.jpg", sizes)`로 부른다. OG 이미지는 `src/app/opengraph-image.jpg`, `src/app/story/opengraph-image.jpg`(1200×630), 아이콘은 `src/app/icon.png`·`apple-icon.png`·`favicon.ico`.

## 개발 / 빌드
```
npm install
npm run dev      # http://localhost:3000
npm run build    # 로컬에서 빌드 → standalone 결과를 서버에 rsync (서버에서 빌드하지 않는다)
# 운영 실행은 `next start`가 아니라 `node .next/standalone/server.js` (PORT, HOSTNAME 지정)
```
## 배포 (msm VM, `warang_frontend`, 포트 3010)
`./deploy.sh` 만 쓴다(로컬 빌드 → standalone rsync → PM2). `DRY_RUN=1 ./deploy.sh`는 삭제 대상만 보여 준다. 서버에서 빌드하지 않는다.
AIM Special 번호(현재 9): `.env.local`의 `WARANG_SPECIAL_ID`(없으면 환경변수)를 deploy.sh가 읽어 빌드와 서버 프로세스에 모두 넣는다. nginx 설정 예시는 `infra/nginx-warang.conf`(SSL은 certbot).
2026-11-21 공개 전환 완료(검색 허용이 기본, 점검용 비공개 빌드만 `NEXT_PUBLIC_INDEXABLE=0 ./deploy.sh`). 맛매치 `serviceHome.ts`에는 Special 9가 와랑 소유로 등록한다.
공개 전환 체크리스트는 작업 지시서(WARANG_TASK_v2)를 따른다.
