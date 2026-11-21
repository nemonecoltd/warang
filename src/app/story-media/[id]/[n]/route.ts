import { getInlineImage } from "@/lib/aim";

// 글 본문에 base64로 박혀 있던 이미지를 파일처럼 내려 준다(브라우저가 하루 캐시). 와랑 Special에 속한 글의 이미지만 나온다.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string; n: string }> }) {
  const { id, n } = await params;
  const img = /^\d+$/.test(id) && /^\d+$/.test(n) ? await getInlineImage(Number(id), Number(n)) : null;
  if (!img) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(Buffer.from(img.data, "base64")), {
    headers: { "Content-Type": img.mime, "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" },
  });
}
