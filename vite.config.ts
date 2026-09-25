import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import site from "./src/data/site.json" with { type: "json" };

// Built as a fully static site: every route is prerendered to HTML under site.base
// (e.g. /islam-and-science/) and served by GitHub Pages.
export default defineConfig({
  base: site.base,
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      router: { basepath: site.base },
      prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true, failOnError: true },
    }),
    react(),
  ],
});
