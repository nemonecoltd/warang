import { INDEXABLE, SITE_URL } from "@/lib/site";

// robots.txt — Next의 robots.ts는 주석을 넣을 수 없어서 직접 내려 준다.
// 맨 위 주석은 다음(Daum) 웹마스터도구 소유 확인용이다(지우면 인증이 풀린다).
const DAUM_VERIFY = "#DaumWebMasterTool:4672f9884eb0d51806ea473af57a8c629da710265b91674674bf01cd0f479c6a:CwADIp+6ZHYYqogn2XaFYA==";

// 기본은 공개(검색 허용). 비공개 점검 빌드(NEXT_PUBLIC_INDEXABLE=0)만 전체 차단
export function GET() {
  const body = INDEXABLE
    ? `${DAUM_VERIFY}\nUser-Agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    : `${DAUM_VERIFY}\nUser-Agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
