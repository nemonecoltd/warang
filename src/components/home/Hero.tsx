// HOME 히어로: 전체 폭 이미지(약 45svh, 가운데 포커스), 왼쪽 문구
import { imageProps, imageSet } from "@/lib/images";

export default function Hero() {
  return (
    <section className="relative isolate flex h-[45svh] min-h-[360px] items-center overflow-hidden pt-16 text-white md:pt-20">
      {/* 모바일은 가운데를 정사각에 가깝게 미리 잘라 둔 작은 이미지(hero-m), 그 외는 폭별 와이드 이미지 */}
      <picture>
        {imageSet("hero-m", "100vw") && <source media="(max-width: 767px)" {...imageSet("hero-m", "100vw")!} />}
        <img {...imageProps("/images/hero-w.jpg", "100vw")} alt="제주의 흰 건물과 돌담, 자갈길" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" fetchPriority="high" decoding="async" />
      </picture>
      {/* 위쪽(헤더)과 왼쪽(문구) 가독성을 위한 옅은 그라데이션 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-transparent to-black/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/35 via-black/5 to-transparent" />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <h1 className="font-headline text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.35] tracking-[-0.01em]">
          제주 서쪽,<br />바람이 머무는 공간.
        </h1>
        <p className="mt-5 text-[0.95rem] leading-7 text-white/90 md:mt-6 md:text-base md:leading-8">
          와랑스튜디오의 공간과 일상,<br />식물과 건축에 관한 기록.
        </p>
      </div>
    </section>
  );
}
