import { createFileRoute } from "@tanstack/react-router";
import { Journey } from "@/components/journey/Journey";
import site from "@/data/site.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: site.name }, { name: "description", content: site.description }], links: [{ rel: "canonical", href: site.url }] }),
  component: Journey,
});
