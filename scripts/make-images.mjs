// public/images/src/*.jpg 원본을 폭별 WebP로 만든다(public/images/gen/{이름}-{폭}.webp) + 크기 목록(src/content/image-manifest.json).
// 사진을 바꿀 때는 src의 같은 이름 파일만 덮어쓰면 된다. 원본보다 큰 폭은 만들지 않는다.
import sharp from "sharp";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { parse } from "node:path";

const SRC = "public/images/src";
const OUT = "public/images/gen";
const WIDTHS = { hero: [480, 800, 1024, 1600, 2400], future: [640, 1024, 1440], map: [640, 1024, 1600, 2400] };
const DEFAULT_WIDTHS = [320, 480, 640, 960, 1400];
mkdirSync(OUT, { recursive: true });

const manifest = {};
for (const file of readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  const { name } = parse(file);
  const img = sharp(`${SRC}/${file}`).rotate();           // 카메라 방향 정보 반영
  const meta = await img.metadata();
  const [w, h] = [meta.width, meta.height];
  const wanted = (WIDTHS[name] ?? DEFAULT_WIDTHS).filter((x) => x < w);
  const widths = [...new Set([...wanted, w])].sort((a, b) => a - b);   // 원본 폭은 항상 포함
  for (const width of widths) {
    await sharp(`${SRC}/${file}`).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(`${OUT}/${name}-${width}.webp`);
  }
  manifest[name] = { width: w, height: h, widths };
}
writeFileSync("src/content/image-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log("images:", Object.entries(manifest).map(([k, v]) => `${k}(${v.widths.join("/")})`).join(" "));
