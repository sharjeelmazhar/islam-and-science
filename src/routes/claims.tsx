import { createFileRoute } from "@tanstack/react-router";
import { ClaimsMap } from "@/components/claims/ClaimsMap";
import site from "@/data/site.json";

export const Route = createFileRoute("/claims")({
  head: () => ({
    meta: [
      { title: `The map of claims · ${site.name}` },
      { name: "description", content: "Every claim on Islam & Science on one map, each graded from established science to not supported." },
    ],
    links: [{ rel: "canonical", href: `${site.url.replace(/\/$/, "")}/claims/` }],
  }),
  component: ClaimsMap,
});
