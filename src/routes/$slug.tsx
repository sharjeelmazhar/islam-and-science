import { createFileRoute, notFound } from "@tanstack/react-router";
import { isPageSlug, pages } from "@/content/registry";
import { PageView } from "@/components/topic/PageView";
import site from "@/data/site.json";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    if (!isPageSlug(params.slug)) throw notFound();
    return params.slug;
  },
  head: ({ loaderData }) => {
    const page = loaderData ? pages[loaderData] : undefined;
    if (!page) return {};
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
  return <PageView key={slug} page={pages[slug]} />;
}
