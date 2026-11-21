import { SNS } from "@/content/links";
import { imageProps } from "@/lib/images";
import ScrollTop from "./ScrollTop";
import { BlogIcon, FacebookIcon, InstagramIcon, YoutubeIcon } from "./icons";

const ICONS = [
  { href: SNS.instagram, label: "인스타그램", Icon: InstagramIcon },
  { href: SNS.youtube, label: "유튜브", Icon: YoutubeIcon },
  { href: SNS.blog, label: "네이버 블로그", Icon: BlogIcon },
  { href: SNS.facebook, label: "페이스북", Icon: FacebookIcon },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-forest text-white">
      {/* 푸터 배경(어두운 식물 이미지 + 오버레이). 실사진은 public/images/future.jpg 를 덮어쓴다 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...imageProps("/images/future.jpg", "100vw")} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_40%]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest/55 via-forest/55 to-forest/88" />

      <div className="mx-auto flex min-h-[420px] max-w-[1440px] flex-col justify-between px-6 pb-10 pt-20 md:min-h-[480px] md:px-12">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="font-display text-3xl tracking-wide md:text-5xl">A Place for Future Projects.</p>
          <p className="text-sm text-white/85 md:text-base">이곳에서 새로운 생각과 프로젝트가 시작됩니다.</p>
          <div className="mt-6"><ScrollTop /></div>
        </div>

        <div className="mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2 font-display tracking-[0.16em]">
            <p className="text-sm">WARANG STUDIO</p>
            <p className="text-xs text-white/80">JEJU · NEMONE</p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-center gap-5">
              {ICONS.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="transition-opacity hover:opacity-60"><Icon /></a>
              ))}
            </div>
            <a href="mailto:contact@nemoneai.com" className="text-xs text-white/80 underline-offset-4 hover:underline">contact@nemoneai.com</a>
          </div>
        </div>
        <p className="mt-10 text-center text-[11px] text-white/70">© 2026 네모네 주식회사. All rights reserved</p>
      </div>
    </footer>
  );
}
