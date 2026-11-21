import { cacheLife, cacheTag } from "next/cache";
import { SAMPLE_POSTS } from "@/content/samples";
import { imageSize } from "./imageSize";
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

// AIM 원본 글. 와랑 Special에 속한 글만 가져온다(새로 쓴 글만 다루는 규칙) — 목록에 없는 번호는 null → 404.
async function fetchRawPost(id: number): Promise<RawPost | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
  cacheTag("aim-special");
  if (!(await getPosts()).some((p) => p.id === id)) return null;
  try {
    const res = await fetch(`${AIM_API}/posts/${id}`);
    if (!res.ok) return null;
    return (await res.json()) as RawPost;
  } catch {
    return null;
  }
}

// 본문에 base64로 박힌 이미지(스마트에디터가 붙여 넣은 사진)는 HTML을 수백 KB로 부풀리고 목록·홈의 미리 가져오기에도 딸려 온다.
// 그래서 /story-media/{글}/{번호} 주소로 분리하고(브라우저가 따로·늦게·캐시해서 받는다), 크기를 읽어 width/height를 넣는다.
type InlineImage = { mime: string; data: string };
const DATA_IMG = /<img\b([^>]*?)\ssrc\s*=\s*(["'])data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+?)\2([^>]*)>/gi;

function splitInlineImages(id: number, html: string): { html: string; images: InlineImage[] } {
  const images: InlineImage[] = [];
  const out = html.replace(DATA_IMG, (_m, pre: string, _q: string, mime: string, data: string, post: string) => {
    const n = images.length;
    const clean = data.replace(/\s+/g, "");
    images.push({ mime, data: clean });
    const dim = imageSize(Buffer.from(clean.slice(0, 40000), "base64"));
    return `<img${pre} src="/story-media/${id}/${n}"${dim ? ` width="${dim.width}" height="${dim.height}"` : ""}${post}>`;
  });
  return { html: out, images };
}

// 글 상세(본문의 base64 이미지는 분리된 상태).
export async function getPost(id: number): Promise<Post | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
  cacheTag("aim-special");
  if (!SPECIAL_ID) return SAMPLE ? SAMPLE_POSTS.find((p) => p.id === id) ?? null : null;
  const raw = await fetchRawPost(id);
  if (!raw) return null;
  return { ...toPost(raw, false), body_html: splitInlineImages(id, raw.body_text ?? "").html };
}

// 분리한 본문 이미지 한 장(/story-media/{글}/{번호}용).
export async function getInlineImage(id: number, n: number): Promise<InlineImage | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
  cacheTag("aim-special");
  const raw = await fetchRawPost(id);
  return raw ? splitInlineImages(id, raw.body_text ?? "").images[n] ?? null : null;
}

// 본문 HTML 정리 — 우리 관리자(AIM)가 쓴 글이지만 스크립트·이벤트 속성·iframe은 제거한다.
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|iframe|object|embed)[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, "$1=$2#$2")
    .replace(/<img\b(?![^>]*\bloading\s*=)/gi, '<img loading="lazy" decoding="async"');   // 본문 이미지는 모두 지연 로딩
}

export const formatDate = (iso: string | null) => (iso ? iso.slice(0, 10).replaceAll("-", ".") : "");
