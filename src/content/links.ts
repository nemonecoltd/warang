// 외부 링크 상수와 히어로 아래 5개 카드. 전부 단순 링크이고 외부 링크는 새 탭으로 연다.
export const SNS = {
  blog: "https://blog.naver.com/warangstudio",
  youtube: "https://www.youtube.com/@warang-studio",
  instagram: "https://www.instagram.com/warangstudio.jeju/",
  facebook:
    "https://www.facebook.com/p/%EC%99%80%EB%9E%91%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4-61582407354119/",
  nemone: "https://nemoneai.com",                 // 네모네 포털
  home: "https://home.nemoneai.com",               // 네모네 주식회사 홈페이지(회사 소개)
  architectureStory: "https://nemoneai.com/special/1",
  plants: "https://plants.nemoneai.com",
  // 네이버 지도의 와랑스튜디오 장소(제주 제주시 한경면 낙조길 196-18)
  naverMap: "https://map.naver.com/p/entry/place/2065456826",
} as const;

export type NavItem = { label: string; href: string; external: boolean };

// 헤더 메뉴. JEJU·LIFE·PLANT·ARCHITECTURE는 외부 링크, STORY는 사이트 안의 /story.
export const NAV: NavItem[] = [
  { label: "HOME", href: "/", external: false },
  { label: "JEJU", href: SNS.blog, external: true },
  { label: "LIFE", href: SNS.instagram, external: true },
  { label: "PLANT", href: SNS.plants, external: true },
  { label: "ARCHITECTURE", href: SNS.architectureStory, external: true },
  { label: "STORY", href: "/story", external: false },
];

export type Card = { no: string; title: string; desc: string; href: string; image: string };

// 히어로 아래 4개 카드(02 LIFE는 인스타그램). 05는 WARANG STORY 섹션의 번호이고, 지도는 별도 가로 배너다.
export const CARDS: Card[] = [
  { no: "01", title: "JEJU", desc: "제주라는 장소와 계절", href: SNS.blog, image: "/images/jeju.jpg" },
  { no: "02", title: "LIFE", desc: "일상과 취향의 기록", href: SNS.instagram, image: "/images/life.jpg" },
  { no: "03", title: "PLANT", desc: "식물과 함께하는 생활", href: SNS.plants, image: "/images/plant.jpg" },
  { no: "04", title: "ARCHITECTURE", desc: "공간을 만들고 살아가는 이야기", href: SNS.architectureStory, image: "/images/architecture.jpg" },
];
