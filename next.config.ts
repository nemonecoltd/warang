import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",       // 로컬 빌드 후 rsync로 배포(서버에서 빌드하지 않는다)
  poweredByHeader: false,
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
