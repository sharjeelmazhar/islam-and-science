import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { PageSlug } from "@/content/registry";

/** Link to another content page, checked at compile time: <PageLink to="earths-motion" hash="porta">…</PageLink>. */
export function PageLink({ to, hash, children }: { to: PageSlug; hash?: string; children: ReactNode }) {
  return (
    <Link to="/$slug/" params={{ slug: to }} {...(hash ? { hash } : {})}>
      {children}
    </Link>
  );
}
