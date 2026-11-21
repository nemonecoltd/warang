import type { Metadata } from "next";
import Link from "next/link";
import { SNS } from "@/content/links";
import { formatDate, getPosts } from "@/lib/aim";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "와랑에서 발견한 것들 — WARANG STORY",
  description: "와랑스튜디오에서 느꼈던 것들, 행동했던 것들, 그리고 변화된 이야기들. 제주의 공간·식물·일상에 관한 기록.",
  alternates: { canonical: "/story" },
};

const INTRO =
  "와랑스튜디오는 제주에서 공간을 짓고 식물을 키우며 하루를 보내는 곳입니다. 이곳에서 느꼈던 것들, 행동했던 것들, 그리고 그 뒤에 달라진 이야기들을 하나씩 기록합니다. 계절에 따라 달라지는 빛과 바람, 돌담과 자갈길을 손보는 일, 아침마다 잎을 살피는 일처럼 작고 사소한 장면들이 이 기록의 시작입니다. 건축과 식물, 일상에 관한 글이 이곳에 차곡차곡 쌓이며 아직 실현되지 않은 프로젝트의 씨앗이 됩니다. 와랑에서 새로 쓴 글만 이곳에 올라옵니다. 글이 올라올 때마다 이 목록과 홈의 이야기 섹션에 가장 먼저 나타나며, 더 오래 이어 온 기록은 블로그와 유튜브, 인스타그램에서 함께 만나실 수 있습니다.";

export default async function StoryPage() {
  const posts = await getPosts();
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-32 md:px-12 md:pb-36 md:pt-44">
      <header className="max-w-3xl">
        <p className="font-display text-xs tracking-[0.25em] text-mute">WARANG STORY</p>
        <h1 className="mt-4 font-headline text-3xl leading-snug md:text-5xl">와랑에서 발견한 것들</h1>
        <p className="mt-8 text-[15px] leading-8 text-ink/85 md:text-base md:leading-9">{INTRO}</p>
      </header>

      {posts.length === 0 ? (
        <div className="mt-20 border-t border-line pt-14 text-sm leading-8 text-mute">
          <p>첫 글을 준비하고 있습니다. 그 사이 와랑의 기록은 아래 채널에서 만나실 수 있습니다.</p>
          <p className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-ink">
            <a href={SNS.blog} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">네이버 블로그</a>
            <a href={SNS.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">인스타그램</a>
            <a href={SNS.youtube} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">유튜브</a>
          </p>
        </div>
      ) : (
        <ul className="mt-16 grid gap-x-8 gap-y-14 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.id}>
              <Link href={`/story/${p.id}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-line">
                  {p.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image_url} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                  )}
                </div>
                <p className="mt-5 font-display text-xs tracking-[0.15em] text-mute">{formatDate(p.created_at)}</p>
                <h2 className="mt-2 font-headline text-xl leading-snug">{p.title}</h2>
                {p.excerpt && <p className="mt-3 line-clamp-2 text-sm leading-7 text-mute">{p.excerpt}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-20 flex justify-center">
        <a href={SNS.blog} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-ink px-8 py-4 font-display text-sm tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper">
          더 많은 기록 보기 <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
