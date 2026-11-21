import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/noto-serif-kr/400.css";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { INDEXABLE, OG_BASE, RSS_TYPES, SITE_URL } from "@/lib/site";
import { SNS } from "@/content/links";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "WARANG STUDIO — 제주에서 꿈꾸는 삶의 공간",
  description:
    "제주에서 시작된 공간과 삶의 이야기. 건축, 식물, 일상 그리고 아직 실현되지 않은 프로젝트를 꿈꾸는 곳. A NEMONE PROJECT.",
  // 비공개 배포 단계: 공개 전까지 색인하지 않는다(공개 전환: NEXT_PUBLIC_INDEXABLE=1 로 빌드)
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  applicationName: "WARANG STUDIO",
  openGraph: { ...OG_BASE, url: SITE_URL },
  twitter: { card: "summary_large_image" },
  alternates: { types: RSS_TYPES },
};

// 사이트 전체 구조화 데이터: 조직 + 웹사이트(SNS는 sameAs로 연결)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "WARANG STUDIO",
      alternateName: "와랑스튜디오",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      email: "contact@nemoneai.com",
      address: { "@type": "PostalAddress", addressCountry: "KR", addressRegion: "제주특별자치도", addressLocality: "제주시", streetAddress: "한경면 낙조길 196-18" },
      geo: { "@type": "GeoCoordinates", latitude: 33.3081199, longitude: 126.2253053 },
      hasMap: SNS.naverMap,
      parentOrganization: { "@type": "Organization", name: "네모네주식회사", url: SNS.nemone },
      sameAs: [SNS.instagram, SNS.youtube, SNS.blog, SNS.facebook],
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "WARANG STUDIO", inLanguage: "ko", publisher: { "@id": `${SITE_URL}/#organization` } },
  ],
};
export const viewport: Viewport = { themeColor: "#f2efea" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-3 focus:text-sm focus:text-ink">
          본문으로 건너뛰기
        </a>
        {/* usePathname을 쓰는 헤더는 /story/[id] 같은 동적 경로에서 Suspense가 필요하다 */}
        <Suspense fallback={<div className="fixed inset-x-0 top-0 z-40 h-16 border-b border-line bg-paper md:h-20" />}>
          <Header />
        </Suspense>
        <main id="main" tabIndex={-1} className="flex-1 outline-none">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
