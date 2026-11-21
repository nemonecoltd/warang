# WARANG STUDIO (warang.nemoneai.com)

와랑스튜디오 공식 사이트. Next.js 16 + Tailwind 4. 자체 백엔드·DB 없음.
- 히어로 아래 5개 카드와 SNS는 단순 링크(`src/content/links.ts`).
- "와랑에서 발견한 것들"(`/story`)만 맛매치(AIM) Special의 새 글을 가져와 보여 준다(`src/lib/aim.ts`, 5분 단위 재검증).

## 환경값 (`.env.example` 참고)
`AIM_API_BASE`, `WARANG_SPECIAL_ID`(없으면 샘플 모드), `NEXT_PUBLIC_SAMPLE`(비공개 단계만), `NEXT_PUBLIC_INDEXABLE`(공개 전환 때만 1).

## 개발 / 빌드
```
npm install
npm run dev      # http://localhost:3000
npm run build    # 로컬에서 빌드 → standalone 결과를 서버에 rsync (서버에서 빌드하지 않는다)
```
배포 절차와 공개 전환 체크리스트는 작업 지시서(WARANG_TASK_v2)를 따른다.
