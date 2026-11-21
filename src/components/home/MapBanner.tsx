import { SNS } from "@/content/links";
import { imageProps } from "@/lib/images";

// 가로로 긴 지도 배너(네모네 포털의 가로배너 방식: 배경 이미지 + 왼쪽 문구 + 오른쪽 둥근 버튼, 전체가 하나의 링크).
// 지도 이미지는 OpenStreetMap 타일로 한 번 만든 정적 이미지(public/images/src/map.jpg)라 외부 지도 스크립트를 쓰지 않는다.
export default function MapBanner() {
  return (
    <section aria-label="오시는 길" className="border-y border-line bg-paper">
      <a href={SNS.naverMap} target="_blank" rel="noopener noreferrer" className="group relative block h-[230px] overflow-hidden md:h-[300px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...imageProps("/images/map.jpg", "100vw")} alt="와랑스튜디오 위치 지도(제주 제주시 한경면 낙조길 196-18)" loading="lazy" decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/80 to-transparent md:via-paper/60" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center gap-5 px-6 md:flex-row md:items-center md:justify-between md:px-12">
          <div>
            <p className="font-display text-xs tracking-[0.25em] text-mute">LOCATION</p>
            <h2 className="mt-3 font-headline text-2xl leading-snug md:text-3xl">와랑스튜디오 오시는 길</h2>
            <p className="mt-3 text-sm leading-6 text-ink/85">제주 제주시 한경면 낙조길 196-18</p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink bg-paper px-5 py-3 text-xs transition-colors group-hover:bg-ink group-hover:text-paper md:mr-[4%]">
            네이버 지도에서 보기 →<span className="sr-only"> (새 탭에서 열림)</span>
          </span>
        </div>
        <span className="absolute bottom-2 right-3 bg-paper/75 px-1.5 py-0.5 text-[10px] text-ink/70">© OpenStreetMap contributors</span>
      </a>
    </section>
  );
}
