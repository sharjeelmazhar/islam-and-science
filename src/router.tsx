import { createRouter } from "@tanstack/react-router";
import site from "@/data/site.json";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    basepath: site.base,
    scrollRestoration: true,
    defaultPreload: "intent",
    trailingSlash: "always",
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
