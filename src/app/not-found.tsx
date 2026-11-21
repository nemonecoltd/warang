import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-32 pt-40 md:pt-52">
      <p className="font-display text-xs tracking-[0.25em] text-mute">404</p>
      <h1 className="mt-4 font-headline text-3xl leading-snug md:text-4xl">찾으시는 글이 없습니다</h1>
      <p className="mt-6 text-[15px] leading-8 text-ink/85">주소가 바뀌었거나 아직 공개되지 않은 글일 수 있습니다.</p>
      <p className="mt-10 flex gap-8 text-sm">
        <Link href="/story" className="underline underline-offset-4">와랑에서 발견한 것들</Link>
        <Link href="/" className="underline underline-offset-4">홈으로</Link>
      </p>
    </section>
  );
}
