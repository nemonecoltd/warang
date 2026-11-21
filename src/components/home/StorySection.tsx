"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { imageProps } from "@/lib/images";
import { ArrowRight } from "../icons";

export type Slide = { src: string; alt: string; href?: string };

// WARANG STORY: 좌측 문구 + 우측 큰 슬라이더(다음 슬라이드가 살짝 보임). 자동 재생 없음, 버튼·키보드·스와이프 지원.
export default function StorySection({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const count = slides.length;
  const go = (i: number) => setIndex(Math.min(count - 1, Math.max(0, i)));

  return (
    <section aria-label="WARANG STORY" className="bg-paper">
      <div className="mx-auto grid max-w-[1440px] items-stretch gap-10 py-14 md:py-20 lg:grid-cols-[minmax(280px,30%)_1fr] lg:gap-0">
        <div className="flex flex-col justify-center px-6 md:px-12">
          <p className="font-display text-sm leading-[1.5] tracking-[0.2em]">WARANG<br />STORY</p>
          <h2 className="mt-6 font-headline text-2xl leading-snug md:text-[1.7rem]">와랑에서 발견한 것들</h2>
          <p className="mt-6 text-[15px] leading-8 text-ink/85">
            이곳에서 느꼈던 것들,<br />행동했던 것들,<br />그리고 변화된 이야기들.
          </p>
          <Link href="/story" className="mt-10 inline-flex w-fit items-center gap-3 text-sm transition-opacity hover:opacity-60">
            더보기 <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="relative min-w-0 overflow-hidden pl-6 lg:pl-0" role="region" aria-roledescription="carousel" aria-label="와랑에서 발견한 것들 슬라이더"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "ArrowRight") go(index + 1); if (e.key === "ArrowLeft") go(index - 1); }}
          onPointerDown={(e) => { startX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current; startX.current = null;
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          }}>
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${index} * (92% + 12px)))` }}>
            {slides.map((s, i) => {
              const img = (
                // eslint-disable-next-line @next/next/no-img-element
                <img {...imageProps(s.src, "(min-width:1024px) 60vw, 92vw")} alt={s.alt} draggable={false} loading={i === 0 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" />
              );
              return (
                <div key={s.src + i} role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${count}`} aria-hidden={i !== index}
                  className="mr-3 h-[260px] w-[92%] flex-none overflow-hidden bg-line md:h-[360px] lg:h-[430px]">
                  {s.href ? <Link href={s.href} tabIndex={i === index ? 0 : -1} className="block h-full">{img}</Link> : img}
                </div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-5 right-[calc(8%+1.5rem)] flex items-center gap-4 text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)] md:right-[calc(8%+2rem)]">
            <span className="font-display text-sm tracking-widest" aria-live="polite">{index + 1} / {count}</span>
            <button type="button" aria-label="이전 슬라이드" disabled={index === 0} onClick={() => go(index - 1)} className="-m-2 rotate-180 p-2 transition-opacity hover:opacity-70 disabled:opacity-30"><ArrowRight className="h-5 w-5" /></button>
            <button type="button" aria-label="다음 슬라이드" disabled={index === count - 1} onClick={() => go(index + 1)} className="-m-2 p-2 transition-opacity hover:opacity-70 disabled:opacity-30"><ArrowRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
