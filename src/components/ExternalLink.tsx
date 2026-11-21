import Link from "next/link";
import type { ReactNode } from "react";

// 외부 링크는 새 탭 + rel, 사이트 안 링크는 Next Link
export function SmartLink({ href, external, className, children, ariaLabel, onClick, current }: {
  href: string; external: boolean; className?: string; children: ReactNode; ariaLabel?: string; onClick?: () => void; current?: boolean;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} aria-label={ariaLabel} aria-current={current ? "page" : undefined} onClick={onClick}>
      {children}
    </Link>
  );
}
