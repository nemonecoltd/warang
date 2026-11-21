import { getPosts } from "@/lib/aim";
import { SITE_URL } from "@/lib/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// "와랑에서 발견한 것들" 새 글 RSS (샘플 글 제외)
export async function GET() {
  const posts = (await getPosts()).filter((p) => !p.sample).slice(0, 30);
  const items = posts
    .map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/story/${p.id}</link>
      <guid isPermaLink="true">${SITE_URL}/story/${p.id}</guid>${p.created_at ? `\n      <pubDate>${new Date(p.created_at).toUTCString()}</pubDate>` : ""}
      <description>${esc(p.excerpt)}</description>
    </item>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>WARANG STUDIO — 와랑에서 발견한 것들</title>
    <link>${SITE_URL}/story</link>
    <description>와랑스튜디오에서 느꼈던 것들, 행동했던 것들, 그리고 변화된 이야기들.</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}
