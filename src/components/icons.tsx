// 아이콘은 공식 로고가 아니라 단순한 선 아이콘(네이버 블로그는 공식 아이콘이 없어 말풍선으로 표현)
type P = { className?: string };
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export function InstagramIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}
export function YoutubeIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="2.8" y="5.5" width="18.4" height="13" rx="3.6" />
      <path d="M10.2 9.4v5.2l4.5-2.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function BlogIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4C7.3 4 3.5 7.1 3.5 11c0 2.2 1.2 4.2 3.2 5.5L5.8 20l3.7-2c.8.2 1.6.3 2.5.3 4.7 0 8.5-3.1 8.5-7.1S16.7 4 12 4z" />
      <circle cx="8.6" cy="11.2" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11.2" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="11.2" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function FacebookIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M14 8.5h2.2V5.2H14c-2.2 0-3.6 1.5-3.6 3.7v1.9H8.2v3.2h2.2V21h3.3v-7h2.3l.5-3.2h-2.8V9.2c0-.5.2-.7.7-.7z" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function ArrowRight({ className }: P) {
  return (
    <svg {...base} width={16} height={16} className={className}>
      <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
    </svg>
  );
}
export function ArrowUp({ className }: P) {
  return (
    <svg {...base} width={18} height={18} className={className}>
      <path d="M12 20V5M6.5 10.5 12 5l5.5 5.5" />
    </svg>
  );
}
