import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { HeadContent, Outlet, Scripts, createRootRoute, Link } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import appCss from "@/styles/app.css?url";
import site from "@/data/site.json";
import { PREFS_BOOT, applyPrefs, usePrefs } from "@/state/prefs";
import { Bar } from "@/components/chrome/Bar";
import { ScaleRail } from "@/components/chrome/ScaleRail";
import { Footer } from "@/components/chrome/Footer";

// three.js never runs during prerender: the sky is loaded only in the browser, after first paint.
const Sky = lazy(() => import("@/scene/Sky"));

const asset = (file: string) => `${site.base}${file}`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: site.name },
      { name: "description", content: site.description },
      { name: "theme-color", content: "#000000" },
      { property: "og:site_name", content: site.name },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${site.url.replace(/\/$/, "")}/og-image.png` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: asset("favicon.svg"), type: "image/svg+xml" },
      { rel: "icon", href: asset("favicon-32.png"), sizes: "32x32", type: "image/png" },
      { rel: "apple-touch-icon", href: asset("apple-touch-icon.png") },
      { rel: "manifest", href: asset("site.webmanifest") },
    ],
  }),
  component: Root,
  notFoundComponent: NotFound,
});

function Root() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFS_BOOT }} />
        <HeadContent />
      </head>
      <body className="bg-paper text-ink">
        <MotionConfig reducedMotion="user">
          <PrefsSync />
          <ClientSky />
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:p-2">
            Skip to content
          </a>
          <Bar />
          <ScaleRail />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </MotionConfig>
        <Scripts />
      </body>
    </html>
  );
}

/** Mirrors stored reading preferences onto <html>. */
function PrefsSync() {
  useEffect(() => {
    applyPrefs(usePrefs.getState());
    return usePrefs.subscribe(applyPrefs);
  }, []);
  return null;
}

function ClientSky() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if ("requestIdleCallback" in window) requestIdleCallback(() => setReady(true));
    else setTimeout(() => setReady(true), 200);
  }, []);
  return ready ? (
    <Suspense fallback={null}>
      <Sky />
    </Suspense>
  ) : null;
}

function NotFound() {
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
