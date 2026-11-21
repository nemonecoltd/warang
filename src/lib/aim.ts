import { cacheLife, cacheTag } from "next/cache";
import { SAMPLE_POSTS } from "@/content/samples";
import { AIM_API, SAMPLE, SPECIAL_ID } from "./site";

export type Post = {
  id: number;
  title: string;
  image_url: string | null;
  created_at: string | null;
  excerpt: string;          // 카드용 요약(HTML 제거, 약 90자)
  body_html?: string;       // 상세용 본문(HTML)
  sample?: boolean;
};

const stripHtml = (html: string) => html.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const byNewest = (a: Post, b: Post) => (b.created_at ?? "").localeCompare(a.created_at ?? "");

type RawPost = { id: number; title?: string; image_url?: string | null; created_at?: string | null; body_text?: string | null };
const toPost = (p: RawPost, withBody: boolean): Post => ({
  id: Number(p.id),
  title: p.title ?? "",
  image_url: p.image_url ?? null,
  created_at: p.created_at ?? null,
  excerpt: stripHtml(p.body_text ?? "").slice(0, 90),
  ...(withBody ? { body_html: p.body_text ?? "" } : {}),
});

// 와랑 Special의 글 목록(최신순). AIM 관리자에서 글을 Special에 넣으면 최대 5분 안에 반영된다.
// 조회에 실패하면 빈 목록을 돌려 준다(이 경우 상세 페이지는 맛매치 정본으로 폴백).
export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
  cacheTag("aim-special");
  if (!SPECIAL_ID) return SAMPLE ? SAMPLE_POSTS : [];
  try {
    const res = await fetch(`${AIM_API}/specials/${SPECIAL_ID}`);
    if (!res.ok) return [];
    const data = (await res.json()) as { posts?: RawPost[] };
    return (data.posts ?? []).map((p) => toPost(p, false)).sort(byNewest);
  } catch {
    return [];
  }
}

// 글 상세. 와랑 Special에 속한 글만 보여 준다(새로 쓴 글만 다루는 규칙) — 목록에 없는 번호는 null → 404.
export async function getPost(id: number): Promise<Post | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
  cacheTag("aim-special");
  if (!SPECIAL_ID) return SAMPLE ? SAMPLE_POSTS.find((p) => p.id === id) ?? null : null;
  if (!(await getPosts()).some((p) => p.id === id)) return null;
  try {
    const res = await fetch(`${AIM_API}/posts/${id}`);
    if (!res.ok) return null;
    return toPost((await res.json()) as RawPost, true);
  } catch {
    return null;
  }
}

// 본문 HTML 정리 — 우리 관리자(AIM)가 쓴 글이지만 스크립트·이벤트 속성·iframe은 제거한다.
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|iframe|object|embed)[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, "$1=$2#$2");
}

export const formatDate = (iso: string | null) => (iso ? iso.slice(0, 10).replaceAll("-", ".") : "");
