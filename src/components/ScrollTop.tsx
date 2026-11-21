"use client";
import { ArrowUp } from "./icons";

export default function ScrollTop() {
  return (
    <button type="button" aria-label="맨 위로"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 text-white transition-colors hover:bg-white/10">
      <ArrowUp />
    </button>
  );
}
