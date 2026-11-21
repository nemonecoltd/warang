import manifest from "@/content/image-manifest.json";

type Entry = { width: number; height: number; widths: number[] };

// 코드에서는 "/images/hero.jpg"처럼 원본 이름으로 부르고, 실제로는 npm run images 가 만든 폭별 WebP를 쓴다.
// 매니페스트에 없는 주소(AIM 썸네일 같은 외부 이미지)는 그대로 둔다.
export function imageProps(src: string, sizes: string) {
  const m = /^\/images\/([a-z0-9-]+)\.(?:jpe?g|png|webp)$/i.exec(src);
  const entry = m ? (manifest as Record<string, Entry>)[m[1]] : undefined;
  if (!m || !entry) return { src };
  const name = m[1];
  const mid = entry.widths.find((w) => w >= 1024) ?? entry.widths[entry.widths.length - 1];
  return {
    src: `/images/gen/${name}-${mid}.webp`,
    srcSet: entry.widths.map((w) => `/images/gen/${name}-${w}.webp ${w}w`).join(", "),
    sizes,
    width: entry.width,
    height: entry.height,
  };
}

// <picture><source>용: 이름과 sizes만으로 srcSet을 만든다(매니페스트에 없으면 null)
export function imageSet(name: string, sizes: string) {
  const entry = (manifest as Record<string, Entry>)[name];
  return entry ? { srcSet: entry.widths.map((w) => `/images/gen/${name}-${w}.webp ${w}w`).join(", "), sizes } : null;
}

// OG 등 단일 주소가 필요할 때(가장 큰 변환본)
export function largestSrc(src: string): string {
  const m = /^\/images\/([a-z0-9-]+)\.(?:jpe?g|png|webp)$/i.exec(src);
  const entry = m ? (manifest as Record<string, Entry>)[m[1]] : undefined;
  return m && entry ? `/images/gen/${m[1]}-${entry.widths[entry.widths.length - 1]}.webp` : src;
}
