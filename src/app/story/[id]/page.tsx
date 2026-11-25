import type { Metadata } from "next";
import "../../pretendard-bold.css";   // 본문의 굵은 글씨용 Bold 조각은 글 상세에서만
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import { OG_BASE, RSS_TYPES, SITE_URL } from "@/lib/site";
import { formatDate, getPost, getPosts, sanitizeHtml } from "@/lib/aim";
import { ArrowRight } from "@/components/icons";
import { imageProps, largestSrc } from "@/lib/images";

type Props = { params: Promise<{ id: string }> };

// Cache Components는 동적 경로에 정적 경로가 최소 하나 필요하다. 글이 없을 때는 존재하지 않는 번호(0)로 채우고 404 처리한다.
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.length ? posts.map((p) => ({ id: String(p.id) })) : [{ id: "0" }];
}

// 와랑 Special 소속 글만 존재하고 정본은 와랑이다(맛매치 /posts/N은 공개 전환 때 맛매치 쪽 설정으로 이 주소를 가리킨다).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = Number((await params).id);
  const post = Number.isFinite(id) ? await getPost(id) : null;
  if (!post) return { title: "와랑에서 발견한 것들", robots: { index: false, follow: false } };
  const canonical = `${SITE_URL}/story/${id}`;
  return {
    title: `${post.title} — WARANG STUDIO`,
    description: post.excerpt,
    alternates: { canonical, types: RSS_TYPES },
    openGraph: { ...OG_BASE, type: "article", title: post.title, description: post.excerpt, url: canonical, images: post.image_url ? [{ url: largestSrc(post.image_url), alt: post.title }] : undefined },
  };
}

export default async function StoryPostPage({ params }: Props) {
  const id = Number((await params).id);
  const post = Number.isFinite(id) ? await getPost(id) : null;
  if (!post) notFound();
  const others = (await getPosts()).filter((p) => p.id !== id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.created_at ?? undefined,
    image: post.image_url ?? undefined,
    mainEntityOfPage: `${SITE_URL}/story/${id}`,
    author: { "@type": "Organization", name: "WARANG STUDIO" },
    publisher: { "@type": "Organization", name: "WARANG STUDIO" },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:pb-36 md:pt-44">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/story" className="font-display text-xs tracking-[0.25em] text-mute transition-opacity hover:opacity-60">← WARANG STORY</Link>
      <p className="mt-10 font-display text-xs tracking-[0.15em] text-mute">{formatDate(post.created_at)}</p>
      <h1 className="mt-3 font-headline text-3xl leading-snug md:text-[2.6rem] md:leading-[1.3]">{post.title}</h1>
      {post.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img {...imageProps(post.image_url, "(min-width:768px) 768px, 100vw")} alt={post.title} className="mt-10 h-auto w-full" decoding="async" />
      )}
      <div className="warang-prose mt-12" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.body_html ?? "", post.title) }} />

      <AdSlot />

      {others.length > 0 && (
        <section className="mt-20" aria-label="다른 글">
          <h2 className="font-display text-xs tracking-[0.25em] text-mute">MORE STORIES</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {others.map((p) => (
              <li key={p.id}>
                <Link href={`/story/${p.id}`} className="flex items-center justify-between gap-6 py-5 transition-opacity hover:opacity-60">
                  <span className="font-headline text-lg leading-snug">{p.title}</span>
                  <ArrowRight className="h-4 w-4 flex-none" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
