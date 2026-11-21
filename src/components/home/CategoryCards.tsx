import { CARDS } from "@/content/links";
import { ArrowRight } from "../icons";

// 히어로 아래 5개 카드. 전부 단순 외부 링크(새 탭)이고, 사이트 안 페이지로 가지 않는다.
export default function CategoryCards() {
  return (
    <section aria-label="와랑스튜디오 바로가기" className="border-b border-line bg-paper">
      <ul className="mx-auto flex max-w-[1440px] snap-x snap-mandatory overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CARDS.map((c, i) => (
          <li key={c.no} className={`w-[68vw] max-w-[320px] flex-none snap-start sm:w-[44vw] lg:w-auto lg:max-w-none ${i > 0 ? "border-l border-line" : ""}`}>
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="group block px-6 pb-10 pt-10 md:px-8 md:pt-12"
              aria-label={`${c.title} — ${c.desc} (새 탭에서 열림)`}>
              <p className="font-display text-xs tracking-[0.1em] text-mute">{c.no}</p>
              <h2 className="mt-2 font-display text-lg tracking-[0.12em] md:text-xl">{c.title}</h2>
              <p className="mt-2 text-[13px] text-mute md:text-sm">{c.desc}</p>
              <div className="relative mt-6 aspect-[4/3] overflow-hidden bg-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-ink">
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
