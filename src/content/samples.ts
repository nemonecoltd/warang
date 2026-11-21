import type { Post } from "@/lib/aim";

// 레이아웃 확인용 샘플(NEXT_PUBLIC_SAMPLE=1 이고 Special 번호가 없을 때만 사용). 공개 전에 제거된다.
export const SAMPLE_POSTS: Post[] = [
  {
    id: 900003,
    title: "[샘플] 와랑에서 처음 맞은 아침",
    image_url: "/images/warang-story.jpg",
    created_at: "2026-11-21T09:00:00+09:00",
    excerpt: "이곳에서 느꼈던 것들 — 창가에 들어오는 빛과 조용한 아침에 관한 샘플 글입니다.",
    body_html: "<p>샘플 글입니다. 실제 글은 맛매치(AIM)에서 작성해 \"와랑에서 발견한 것들\" Special에 넣으면 이 자리에 나타납니다.</p><h2>느낀 것</h2><p>제주의 아침은 빛이 먼저 도착합니다. 창가에 앉아 천천히 하루를 시작하는 시간.</p>",
    sample: true,
  },
  {
    id: 900002,
    title: "[샘플] 돌담을 따라 걷는 길",
    image_url: "/images/jeju.jpg",
    created_at: "2026-11-20T09:00:00+09:00",
    excerpt: "행동했던 것들 — 돌담과 자갈길을 정리하며 알게 된 것들에 관한 샘플 글입니다.",
    body_html: "<p>샘플 글입니다.</p><h2>한 일</h2><p>돌 하나하나를 맞춰 쌓은 담과 자갈길을 매만지는 일.</p>",
    sample: true,
  },
  {
    id: 900001,
    title: "[샘플] 식물과 함께 달라진 하루",
    image_url: "/images/plant.jpg",
    created_at: "2026-11-19T09:00:00+09:00",
    excerpt: "그리고 변화된 이야기들 — 식물을 들이고 달라진 일상에 관한 샘플 글입니다.",
    body_html: "<p>샘플 글입니다.</p><h2>달라진 것</h2><p>아침마다 잎을 살피는 일이 하루의 첫 일이 되었습니다.</p>",
    sample: true,
  },
];
