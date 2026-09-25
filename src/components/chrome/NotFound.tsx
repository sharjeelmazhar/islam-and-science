import { Link } from "@tanstack/react-router";

/** Shown for unknown URLs (root notFoundComponent) and prerendered as 404.html. */
export function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-3xl flex-col justify-end px-6 pb-24">
      <p className="eyebrow">404 · Beyond the boundaries</p>
      <h1 className="mt-4 font-serif text-5xl md:text-7xl">This page is not in our sky.</h1>
      <p className="mt-6 max-w-[48ch] font-serif text-xl text-ink-2">
        “…if it is possible for you to cross the boundaries of the heavens and the earth, so you may cross them.” (55:33)
      </p>
      <Link to="/" className="mt-10 font-mono text-sm tracking-[0.08em] text-gold uppercase">
        ← Back to the beginning
      </Link>
    </section>
  );
}
