import { Link } from "@tanstack/react-router";
import site from "@/data/site.json";
import { credit } from "@/domain/verses";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-rule bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 text-sm text-ink-3 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg text-ink">{site.name}</p>
          <p className="mt-1">{site.tagline}</p>
        </div>
        <div>
          <p>Qur’an text: Tanzil Project (Uthmani). English: {credit}.</p>
          <p className="mt-1">Hadith numbering: sunnah.com.</p>
        </div>
        <div>
          <p>
            Corrections are welcome:{" "}
            <a href={`mailto:${site.email}`} className="text-ink">
              {site.email}
            </a>
          </p>
          <p className="mt-1">
            <Link to="/$slug/" params={{ slug: "references" }} className="text-ink">
              Sources &amp; References
            </Link>{" "}
            ·{" "}
            <Link to="/$slug/" params={{ slug: "about" }} className="text-ink">
              About
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
