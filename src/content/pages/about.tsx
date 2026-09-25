import type { Page } from "../define";
import site from "@/data/site.json";
import { Callout, Split } from "@/components/content/Text";
import { PageLink } from "@/components/content/PageLink";
import { Verse } from "@/components/scripture/Verse";

export default {
  slug: "about",
  title: "About & Contact",
  navTitle: "About & Contact",
  description: "What this site is for, who it is for, how it is kept accurate, and how to reach us with corrections or questions.",
  hook: "What this site is for, who it is for, how it is kept accurate, and how to reach us with corrections or questions.",
  part: "integrity",
  scale: null,
  scene: "reader",
  flow: [
    {
      kind: "section",
      id: "what-this-site-is",
      title: "What this site is",
      body: (
        <Split>
          <div>
            <p>
              <strong>Islam &amp; Science</strong> is an independent, non-commercial guide to what the Qur’an and the authentic Hadith say about the natural world, set
              beside what modern science has found. It is written for curious people of every background: Muslims of any school, people of other faiths, and people of
              none.
            </p>
            <p>
              It is not a platform for sectarian or inter-religious debate. It tries to do one thing well: present the texts exactly, present the science accurately,
              and say honestly how closely they correspond.
            </p>
            <p className="font-serif text-xl leading-snug text-ink">
              Its spirit is the one the Qur’an teaches. Look at the heavens and the earth, reflect, and let knowledge lead to gratitude and to its Source.
            </p>
          </div>
          <Verse at="3:191" />
        </Split>
      ),
    },
    {
      kind: "section",
      id: "contact-and-corrections",
      title: "Contact and corrections",
      body: (
        <Split>
          <div>
            <p>
              Accuracy matters more than anything else on this site. If you spot a mistake of any kind, please get in touch: a wrong reference, a mistranslation, an
              outdated scientific figure, a misrepresented scholar, or a broken link.
            </p>
            <p>
              <a href={`mailto:${site.email}?subject=Islam%20%26%20Science%20website`} className="font-serif text-2xl text-gold no-underline hover:underline">
                {site.email}
              </a>
            </p>
          </div>
          <Callout title="To help us fix things quickly, please include">
            <ul>
              <li>the page and section (or copy the link)</li>
              <li>what you believe is wrong</li>
              <li>your source: a verse, a hadith reference, a book or a paper</li>
            </ul>
          </Callout>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "how-accuracy-is-maintained",
      title: "How accuracy is maintained",
      body: (
        <ul>
          <li>
            <strong>Qur’an text is never typed by hand.</strong> The Arabic of every verse is inserted automatically from the verified Tanzil Uthmani text when the site
            is built. The English is taken from the printed translation and checked against the original pages. The build stops if any referenced verse is missing.
          </li>
          <li>
            <strong>Every hadith links to its source</strong> on sunnah.com, with its grading stated.
          </li>
          <li>
            <strong>Every correspondence is graded</strong> with an evidence badge. See <PageLink to="approach">How to Read This Site</PageLink>.
          </li>
          <li>
            <strong>Popular claims that fail checking are listed</strong>, not used. See <PageLink to="myths">Claims We Don’t Make</PageLink>.
          </li>
        </ul>
      ),
    },
    {
      kind: "section",
      id: "privacy-and-accessibility",
      title: "Privacy and accessibility",
      body: (
        <Split>
          <div>
            <h3>Privacy</h3>
            <p>
              No accounts, no advertising, no tracking and no cookies. Your theme and reading preferences are stored only in your own browser. Fonts are served from
              this site, so no third party sees your visit.
            </p>
          </div>
          <div>
            <h3>Accessibility</h3>
            <p>
              The site follows your system’s light or dark setting, and you can override it. Use the <strong>Aa</strong> button to enlarge text, enlarge the Arabic, or
              switch to a font designed for low vision (Atkinson Hyperlegible). Every page works with a keyboard: press <kbd className="font-mono text-ink">/</kbd> to
              search. Animations respect your “reduce motion” setting.
            </p>
          </div>
        </Split>
      ),
    },
  ],
} satisfies Page;
