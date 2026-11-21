import { CARDS } from "@/content/links";
import { imageProps } from "@/lib/images";
import { ArrowRight } from "../icons";

// 히어로 아래 4개 카드. 전부 단순 외부 링크(새 탭)이고, 사이트 안 페이지로 가지 않는다.
export default function CategoryCards() {
  return (
    <section aria-label="와랑스튜디오 바로가기" className="border-b border-line bg-paper">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <li key={c.no} className={`${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:border-line" : ""}`}>
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="group block px-4 pb-8 pt-8 md:px-8 md:pb-10 md:pt-12">
              <p className="font-display text-xs tracking-[0.1em] text-mute">{c.no}</p>
              <h2 className="mt-2 font-display text-[15px] tracking-[0.1em] md:text-xl md:tracking-[0.12em]">{c.title}</h2>
              <p className="mt-2 text-[13px] leading-5 text-mute md:text-sm">{c.desc}<span className="sr-only"> (새 탭에서 열림)</span></p>
              <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-line md:mt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img {...imageProps(c.image, "(min-width:1024px) 25vw, 50vw")} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-ink md:bottom-3 md:right-3">
                  <ArrowRight />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
