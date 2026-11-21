import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",       // 로컬 빌드 후 rsync로 배포(서버에서 빌드하지 않는다)
  poweredByHeader: false,
  async headers() {
    // 폭별로 변환한 이미지는 하루 캐시(같은 이름으로 사진을 바꾸면 하루 안에 갱신) — 재방문 때 다시 받지 않는다
    return [{ source: "/images/gen/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] }];
  },
  images: { unoptimized: true },   // 이미지는 npm run images 가 미리 변환한다(서버에서 sharp를 쓰지 않는다)
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
