import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/chrome/NotFound";

// Prerendered to /404.html (see vite.config.ts); not linked from anywhere.
export const Route = createFileRoute("/not-found")({
  head: () => ({ meta: [{ title: "Not found · Islam & Science" }, { name: "robots", content: "noindex" }] }),
  component: NotFound,
});
