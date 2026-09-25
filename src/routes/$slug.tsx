import { Suspense, use } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { isPageSlug, navOf } from "@/content/nav";
import { loadPage } from "@/content/load";
import type { PageSlug } from "@/content/registry";
import { PageView } from "@/components/topic/PageView";
import site from "@/data/site.json";

export const Route = createFileRoute("/$slug")({
  loader: async ({ params }) => {
    if (!isPageSlug(params.slug)) throw notFound();
    await loadPage(params.slug); // warm the chunk so the page renders without a fallback
    return params.slug;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const page = navOf(loaderData);
    const url = `${site.url.replace(/\/$/, "")}/${page.slug}/`;
    return {
      meta: [
        { title: `${page.title} · ${site.name}` },
        { name: "description", content: page.description },
        { property: "og:title", content: page.title },
        { property: "og:description", content: page.description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: SlugPage,
});

function SlugPage() {
  const slug = Route.useLoaderData();
  return (
    <Suspense fallback={null}>
      <Loaded key={slug} slug={slug} />
    </Suspense>
  );
}

function Loaded({ slug }: { slug: PageSlug }) {
  return <PageView page={use(loadPage(slug))} />;
}
