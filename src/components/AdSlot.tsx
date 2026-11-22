"use client";

import Script from "next/script";

// 글 하단 디스플레이 광고(AdSense, 슬롯 이름 viewer_down). 게시자 ID는 네모네AIM과 같다.
// 광고 스크립트(약 100KB 이상)는 글 상세에서만, 화면이 한가해진 뒤(lazyOnload)에 불러 첫 화면을 느리게 하지 않는다.
// 광고가 뜨기 전·안 뜰 때 화면이 밀리지 않도록 높이를 미리 잡아 둔다.
const CLIENT = "ca-pub-4274957638983041";
const SLOT = "5412270743";

export default function AdSlot() {
  return (
    <aside aria-label="광고" className="mt-20 min-h-[280px]">
      <Script
        id="adsbygoogle-js"
        async
        strategy="lazyOnload"
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`}
        onReady={() => {
          try {
            // @ts-expect-error adsbygoogle은 광고 스크립트가 만드는 전역 배열
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch {
            /* 광고가 막혀 있어도 글은 그대로 보인다 */
          }
        }}
      />
      <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={CLIENT} data-ad-slot={SLOT} data-ad-format="auto" data-full-width-responsive="true" />
    </aside>
  );
}
