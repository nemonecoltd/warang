"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV, SNS } from "@/content/links";
import { SmartLink } from "./ExternalLink";
import { BlogIcon, InstagramIcon, YoutubeIcon } from "./icons";

const SNS_ICONS = [
  { href: SNS.instagram, label: "인스타그램", Icon: InstagramIcon },
  { href: SNS.youtube, label: "유튜브", Icon: YoutubeIcon },
  { href: SNS.blog, label: "네이버 블로그", Icon: BlogIcon },
];

// HOME은 맨 위에서 투명 오버레이(흰 글씨), 스크롤하거나 다른 페이지에서는 오프화이트 배경(어두운 글씨)
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  // 메뉴는 "열린 경로"를 기억해 두고, 경로가 바뀌면 자동으로 닫힌 것으로 취급한다(effect에서 setState 하지 않음)
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = useCallback((v: boolean | ((o: boolean) => boolean)) => {
    setOpenPath((cur) => {
      const was = cur === pathname;
      const next = typeof v === "function" ? v(was) : v;
      return next ? pathname : null;
    });
  }, [pathname]);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, [setOpen]);

  // 전체화면 메뉴: 스크롤 잠금, Esc로 닫기, Tab이 메뉴 밖으로 나가지 않게
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab" || !menuRef.current) return;
      const f = [...Array.from(menuRef.current.querySelectorAll<HTMLElement>("a")), buttonRef.current].filter((x): x is HTMLElement => !!x);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, close]);

  // 투명 오버레이(흰 글씨): HOME 맨 위, 또는 전체화면 메뉴가 열려 있을 때
  const overlay = (isHome && !scrolled) || open;
  const tone = overlay ? "text-white" : "text-ink";
  const bg = overlay ? "bg-transparent" : "bg-paper/95 backdrop-blur-sm border-b border-line";

  return (
    <>
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${bg} ${tone}`}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-12">
        <Link href="/" className="font-display leading-[1.05] tracking-[0.18em]">
          <span className="block text-[17px] md:text-xl">WARANG</span>
          <span className="block pl-[0.9em] text-[11px] md:text-[13px]">STUDIO</span>
          <span className="sr-only"> 홈</span>
        </Link>

        <div className="flex items-center gap-4 lg:gap-12">
          <nav className="hidden items-center gap-7 lg:flex" aria-label="주 메뉴">
            {NAV.map((n) => (
              <SmartLink key={n.label} href={n.href} external={n.external} current={!n.external && pathname === n.href}
                className={`font-display text-[13px] tracking-[0.16em] transition-opacity hover:opacity-60 ${pathname === n.href ? "underline underline-offset-8" : ""}`}>
                {n.label}
              </SmartLink>
            ))}
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            {SNS_ICONS.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="transition-opacity hover:opacity-60">
                <Icon />
              </a>
            ))}
          </div>
          <button ref={buttonRef} type="button" className="-mr-2 flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "메뉴 닫기" : "메뉴 열기"} onClick={() => setOpen((v) => !v)}>
            <span className="relative block h-3 w-6">
              <span className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 bottom-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
    </header>
      {open && (
        <div id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="전체 메뉴"
          className="fixed inset-0 z-30 flex flex-col justify-between bg-forest px-6 pb-10 pt-24 text-white">
          <nav className="flex flex-col gap-6" aria-label="모바일 메뉴">
            {NAV.map((n) => (
              <SmartLink key={n.label} href={n.href} external={n.external} onClick={() => setOpen(false)}
                className="font-display text-4xl tracking-[0.12em]">
                {n.label}
              </SmartLink>
            ))}
          </nav>
          <div className="flex items-center gap-6 text-white/90">
            {SNS_ICONS.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon /></a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
