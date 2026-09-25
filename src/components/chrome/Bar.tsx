import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { ChaptersMenu } from "./ChaptersMenu";
import { ThemeToggle } from "./ThemeToggle";
import { Settings } from "./Settings";

export function Bar() {
  return (
    <header className="no-print fixed inset-x-0 top-0 z-40 bg-paper/95 md:bg-transparent md:bg-linear-to-b md:from-paper md:via-paper/85 md:to-transparent">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <Link to="/" aria-label="Islam & Science, home" className="flex items-center gap-2.5 text-ink no-underline">
          <Logo className="size-8" />
          <span className="hidden font-mono text-[0.72rem] tracking-[0.1em] whitespace-nowrap uppercase sm:inline">Islam &amp; Science</span>
        </Link>
        <span className="flex-1" />
        <ChaptersMenu />
        <ThemeToggle />
        <Settings />
      </div>
    </header>
  );
}
