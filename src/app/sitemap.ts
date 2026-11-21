import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/aim";
import { SITE_URL } from "@/lib/site";

// 홈, /story, 와랑 Special의 글(샘플 글은 제외)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getPosts()).filter((p) => !p.sample);
  const latest = posts[0]?.created_at ? new Date(posts[0].created_at) : undefined;
  return [
    { url: SITE_URL, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/story`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/story/${p.id}`,
      lastModified: p.created_at ? new Date(p.created_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
