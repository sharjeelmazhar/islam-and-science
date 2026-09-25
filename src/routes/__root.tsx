import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import appCss from "@/styles/app.css?url";
import serifFont from "@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2?url";
import sansFont from "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2?url";
import site from "@/data/site.json";
import { PREFS_BOOT, applyPrefs, usePrefs, type Prefs } from "@/state/prefs";
import { Bar } from "@/components/chrome/Bar";
import { ScaleRail } from "@/components/chrome/ScaleRail";
import { Footer } from "@/components/chrome/Footer";
import { NotFound } from "@/components/chrome/NotFound";

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
      // The headline serif and body sans are on every first screen: fetch them with the CSS, not after it.
      { rel: "preload", href: serifFont, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: sansFont, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
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
          <PrefsSync />
          <ClientSky />
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:p-2">
            Skip to content
          </a>
          <Bar />
          <ScaleRail />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
        <Scripts />
      </body>
    </html>
  );
}

/** Mirrors stored reading preferences onto <html>. */
function PrefsSync() {
  useEffect(() => {
    const apply = (p: Prefs) => {
      applyPrefs(p);
      // The hyperlegible face is only fetched by readers who choose it.
      if (p.font === "legible") void import("@fontsource/atkinson-hyperlegible/latin-400.css");
    };
    apply(usePrefs.getState());
    return usePrefs.subscribe(apply);
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
