// public/images/src/*.jpg 원본을 폭별 WebP로 만든다(public/images/gen/{이름}-{폭}.webp) + 크기 목록(src/content/image-manifest.json).
// 사진을 바꿀 때는 src의 같은 이름 파일만 덮어쓰면 된다. 원본보다 큰 폭은 만들지 않는다.
// 사이트를 가볍게 하려고 쓰임새별로 폭·품질을 제한한다(카드는 화면에서 최대 약 480px라 960px까지만).
import sharp from "sharp";
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { parse } from "node:path";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const SRC = "public/images/src";
const OUT = "public/images/gen";
const CARD = { widths: [320, 480, 640, 960], quality: 70 };
const CONFIG = {
  hero: { skip: true },   // 원본 전체는 화면에 쓰지 않는다(아래 파생본 hero-w / hero-m만 만든다)
  future: { widths: [640, 1024, 1440], quality: 62 },
  map: { widths: [640, 1024, 1600, 2400], quality: 70 },
  jeju: CARD,
  life: CARD,
  plant: CARD,
  architecture: CARD,
  story: CARD,
};
const DEFAULT = { widths: [320, 480, 640, 960, 1400], quality: 75 };

// 파생본(원본을 가운데 기준으로 잘라 만든 이미지)
//  - hero-m: 모바일 — 가운데를 정사각에 가깝게(짧은 히어로가 가로로 긴 사진을 키워 쓰는 낭비를 없앤다)
//  - hero-w: 데스크톱·태블릿 — 위아래를 덜어낸 와이드(짧은 히어로에서 보이지 않는 부분을 보내지 않는다)
const DERIVED = [
  { name: "hero-m", from: "hero", widthRatio: 0.95, widths: [390, 780], quality: 56 },
  { name: "hero-w", from: "hero", cropHeight: 1000, widths: [800, 1280, 1600, 1920], quality: 62 },
];

rmSync(OUT, { recursive: true, force: true });   // 이전 변환본이 배포에 섞이지 않게 매번 새로 만든다
mkdirSync(OUT, { recursive: true });

const manifest = {};
const write = (pipeline, name, width, quality) =>
  pipeline.resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(`${OUT}/${name}-${width}.webp`);

for (const file of readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  const { name } = parse(file);
  const meta = await sharp(`${SRC}/${file}`).rotate().metadata();
  const [w, h] = [meta.width, meta.height];
  // 원본 내용의 해시 — 사진을 바꾸면 주소(?v=)도 바뀌어 하루 캐시에 남은 옛 이미지가 보이지 않는다
  const v = createHash("md5").update(readFileSync(`${SRC}/${file}`)).digest("hex").slice(0, 8);
  const cfg = CONFIG[name] ?? DEFAULT;
  if (!cfg.skip) {
    const fit = cfg.widths.filter((x) => x <= w);
    const widths = fit.length ? fit : [w];          // 요청한 폭이 모두 원본보다 크면 원본 폭 하나
    for (const width of widths) await write(sharp(`${SRC}/${file}`).rotate(), name, width, cfg.quality);
    manifest[name] = { width: w, height: h, widths, v };
  }

  for (const d of DERIVED.filter((x) => x.from === name)) {
    const cw = d.widthRatio ? Math.min(w, Math.round(h * d.widthRatio)) : w;
    const ch = d.cropHeight ? Math.min(h, d.cropHeight) : h;
    const region = { left: Math.round((w - cw) / 2), top: Math.round((h - ch) / 2), width: cw, height: ch };
    const all = d.widths.filter((x) => x <= cw);
    for (const width of all) await write(sharp(`${SRC}/${file}`).rotate().extract(region), d.name, width, d.quality);
    manifest[d.name] = { width: cw, height: ch, widths: all, v };
  }
}

writeFileSync("src/content/image-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log("images:", Object.entries(manifest).map(([k, v]) => `${k}(${v.widths.join("/")})`).join(" "));
