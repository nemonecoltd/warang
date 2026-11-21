// 사이트 공통 상수. 2026-11-21 공개 전환 — 기본은 검색 허용이고, 비공개 점검 빌드만 NEXT_PUBLIC_INDEXABLE=0 으로 만든다(빌드 시점에 박힘).
export const SITE_URL = "https://warang.nemoneai.com";
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE !== "0";
// 맛매치(AIM) 공개 API와 와랑 Special 번호(AIM 관리자에서 만든 "와랑에서 발견한 것들"). 번호가 없으면 샘플 모드.
export const AIM_API = (process.env.AIM_API_BASE || "https://nemoneai.com/api").replace(/\/$/, "");
export const AIM_SITE = "https://nemoneai.com";
export const SPECIAL_ID = Number(process.env.WARANG_SPECIAL_ID) || null;
// 비공개 단계에서만 1 — Special이 비어 있을 때 레이아웃 확인용 샘플 글을 보여 준다(공개 전환 때 제거)
export const SAMPLE = process.env.NEXT_PUBLIC_SAMPLE === "1";

// 페이지별 metadata는 layout의 alternates/openGraph를 통째로 덮어쓰므로 공통 값을 여기서 가져다 쓴다
export const RSS_TYPES = { "application/rss+xml": "/rss.xml" };
export const OG_BASE = { type: "website" as const, siteName: "WARANG STUDIO", locale: "ko_KR" };
