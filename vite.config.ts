import { readdirSync } from "node:fs";
import { setDefaultAutoSelectFamily } from "node:net";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import site from "./src/data/site.json" with { type: "json" };

// The prerenderer fetches pages from a local server whose event loop is busy rendering; Node's
// happy-eyeballs gives up on ::1 after 250 ms and falls back to an unbound IPv4 port. Connect directly.
setDefaultAutoSelectFamily(false);

// Every content page is a file in src/content/pages; the registry type-checks that list at build time.
const slugs = readdirSync(new URL("./src/content/pages", import.meta.url)).map((f) => f.replace(/\.tsx$/, ""));
const paths = ["", "claims/", ...slugs.map((s) => `${s}/`)].map((p) => `${site.base}${p}`);

// Built as a fully static site: every route is prerendered to HTML under site.base
// (e.g. /islam-and-science/) and served by GitHub Pages.
export default defineConfig({
  base: site.base,
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      router: { basepath: site.base },
      pages: [
        ...paths.map((path) => ({ path })),
        // GitHub Pages serves /404.html for unknown URLs; the client router then shows the same page.
        { path: `${site.base}not-found/`, prerender: { outputPath: "/404.html" }, sitemap: { exclude: true } },
      ],
      sitemap: { enabled: true, host: new URL(site.url).origin },
      prerender: { enabled: true, crawlLinks: false, autoStaticPathsDiscovery: false, autoSubfolderIndex: true, failOnError: true, concurrency: 4 },
    }),
    react(),
  ],
});
