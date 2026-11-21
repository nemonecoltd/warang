// HOME 히어로: 전체 폭 이미지(약 90svh), 왼쪽 문구, 왼쪽 세로선 + SCROLL
export default function Hero() {
  return (
    <section className="relative isolate flex h-[90svh] min-h-[560px] items-center overflow-hidden text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero.jpg" alt="제주의 흰 건물과 돌담, 자갈길" className="absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
      {/* 위쪽(헤더)과 왼쪽(문구) 가독성을 위한 옅은 그라데이션 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-transparent to-black/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/35 via-black/5 to-transparent" />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <h1 className="font-headline text-[clamp(2.1rem,4.4vw,3.9rem)] leading-[1.35] tracking-[-0.01em]">
          제주에서<br />꿈꾸는 삶의 공간.
        </h1>
        <p className="mt-6 text-[0.95rem] leading-7 text-white/90 md:mt-8 md:text-base md:leading-8">
          와랑스튜디오의 공간과 일상,<br />식물과 건축에 관한 기록.
        </p>
      </div>

      <div className="absolute bottom-0 left-6 flex flex-col items-center gap-3 md:left-12" aria-hidden="true">
        <span className="h-10 w-px bg-white/70" />
        <span className="font-display text-[10px] tracking-[0.25em]">SCROLL</span>
        <span className="h-16 w-px bg-white/70 md:h-24" />
      </div>
    </section>
  );
}
