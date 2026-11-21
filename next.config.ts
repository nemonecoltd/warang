import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",       // 로컬 빌드 후 rsync로 배포(서버에서 빌드하지 않는다)
  poweredByHeader: false,
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
