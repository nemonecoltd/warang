import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/noto-serif-kr/400.css";
import "@fontsource/noto-serif-kr/600.css";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { INDEXABLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "WARANG STUDIO — 제주에서 꿈꾸는 삶의 공간",
  description:
    "제주에서 시작된 공간과 삶의 이야기. 건축, 식물, 일상 그리고 아직 실현되지 않은 프로젝트를 꿈꾸는 곳. A NEMONE PROJECT.",
  // 비공개 배포 단계: 공개 전까지 색인하지 않는다(공개 전환: NEXT_PUBLIC_INDEXABLE=1 로 빌드)
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#f2efea" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        {/* usePathname을 쓰는 헤더는 /story/[id] 같은 동적 경로에서 Suspense가 필요하다 */}
        <Suspense fallback={<div className="fixed inset-x-0 top-0 z-40 h-16 border-b border-line bg-paper md:h-20" />}>
          <Header />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
