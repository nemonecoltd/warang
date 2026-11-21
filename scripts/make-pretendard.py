"""Pretendard 정적 조각(Regular 400, Bold 700)만 src/fonts/pretendard 로 복사하고 CSS(src/app/pretendard.css)를 만든다.
가변 폰트 조각(약 27KB)보다 정적 조각(약 11KB)이 훨씬 가볍고, 한글은 쓰는 글자가 든 조각만 내려받는다.
npm 패키지 pretendard(devDependency)에서 한 번 생성해 커밋해 둔 것이라 평소 빌드에서는 실행하지 않는다."""
import re, shutil, os
SRC = "node_modules/pretendard/dist/web/static"
OUT_FONTS = "src/fonts/pretendard"
os.makedirs(OUT_FONTS, exist_ok=True)
head = "/* 자동 생성: scripts/make-pretendard.py — Pretendard 정적 조각(%s) */"
css = {400: [head % "Regular 400, 모든 페이지"], 700: [head % "Bold 700, 글 상세 페이지에서만 불러옴"]}
n = 0
for name, weight in (("Regular", 400), ("Bold", 700)):
    s = open(f"{SRC}/Pretendard-{name}.css", encoding="utf-8").read()
    for block in re.findall(r"@font-face\s*\{[^}]*\}", s):
        idx = re.search(r"Pretendard-%s\.subset\.(\d+)\.woff2" % name, block).group(1)
        ur = re.search(r"unicode-range:\s*([^;]+);", block).group(1).strip()
        fn = f"Pretendard-{name}.subset.{idx}.woff2"
        shutil.copyfile(f"{SRC}/woff2-dynamic-subset/{fn}", f"{OUT_FONTS}/{fn}")
        css[weight].append("@font-face{font-family:'Pretendard';font-style:normal;font-display:swap;font-weight:%d;src:url(../fonts/pretendard/%s) format('woff2');unicode-range:%s}" % (weight, fn, ur))
        n += 1
for w, name in ((400, "pretendard.css"), (700, "pretendard-bold.css")):
    open(f"src/app/{name}", "w", encoding="utf-8").write("\n".join(css[w]) + "\n")
print("조각", n, "개,", round(sum(os.path.getsize(f"{OUT_FONTS}/{f}") for f in os.listdir(OUT_FONTS)) / 1024), "KB")
