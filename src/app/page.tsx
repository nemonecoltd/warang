import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import StorySection, { type Slide } from "@/components/home/StorySection";
import { getPosts } from "@/lib/aim";

// "와랑에서 발견한 것들" 최신 글 3개. 글이 없으면 대표 이미지 1장(→ /story)만 보여 준다.
export default async function Home() {
  const posts = (await getPosts()).slice(0, 3);
  const slides: Slide[] = posts.length
    ? posts.map((p) => ({ src: p.image_url ?? "/images/warang-story.jpg", alt: p.title, href: `/story/${p.id}` }))
    : [{ src: "/images/warang-story.jpg", alt: "와랑에서 발견한 것들", href: "/story" }];
  return (
    <>
      <Hero />
      <CategoryCards />
      <StorySection slides={slides} />
    </>
  );
}
