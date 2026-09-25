import type { Page } from "../define";
import site from "@/data/site.json";
import { Callout, Split, Timeline, Tr } from "@/components/content/Text";
import { PageLink } from "@/components/content/PageLink";
import { Verse } from "@/components/scripture/Verse";
import { GradeRow } from "@/components/content/pages/approach/GradeRow";

export default {
  slug: "approach",
  title: "How to Read This Site",
  navTitle: "How to Read This Site",
  description:
    "How we set scripture beside science: what counts as evidence, how the evidence badges work, and why we keep revelation, interpretation and scientific theory clearly apart.",
  hook: "How we set scripture beside science: what counts as evidence, how the evidence badges work, and why we keep revelation, interpretation and scientific theory clearly apart.",
  part: "start",
  scale: null,
  scene: "reader",
  flow: [
    {
      kind: "section",
      id: "three-things-we-keep-apart",
      title: "Three things we keep apart",
      body: (
        <>
          <p className="font-serif text-2xl leading-snug text-ink">
            Most confusion about “Islam and science” comes from mixing up three different things. On every page we keep them separate.
          </p>
          <Split cols={3}>
            <div className="border-t border-rule-2 pt-5">
              <h3>1 · The text</h3>
              <p>
                The words of the Qur’an and of authentic hadith. For Muslims the Qur’an is the speech of God and does not err. We quote it exactly, in Arabic with a
                standard translation, and link to the source.
              </p>
            </div>
            <div className="border-t border-rule-2 pt-5">
              <h3>2 · The interpretation</h3>
              <p>
                What scholars have understood the words to mean, from the Companions through the classical commentators to today. Interpretation is human and
                scholarly. It can be richer or poorer, and it can differ.
              </p>
            </div>
            <div className="border-t border-rule-2 pt-5">
              <h3>3 · The science</h3>
              <p>
                What careful observation and experiment have found so far. Some findings are as secure as knowledge gets, for example that blood circulates. Others
                are provisional models that may change.
              </p>
            </div>
          </Split>
          <p>
            A claim like “the Qur’an says X, and science proved X” is only as strong as the weakest of those three links. Our badges tell you which link is doing the
            work.
          </p>
        </>
      ),
    },
    {
      kind: "section",
      id: "the-evidence-badges",
      title: "The evidence badges",
      body: (
        <div>
          <GradeRow status="established">
            <p>
              The plain, natural meaning of the Arabic, often the meaning classical scholars also gave, lines up with a well-established scientific finding. Example:
              sunrise shifting between two extreme points through the year (55:17).
            </p>
          </GradeRow>
          <GradeRow status="interpretive">
            <p>
              A modern reading that the Arabic genuinely allows, but which is not the only meaning and was often not how classical scholars read it. It can be
              beautiful and even likely, but it is not proof.
            </p>
          </GradeRow>
          <GradeRow status="debated">
            <p>
              Serious, qualified people disagree, either about how to read the text or about what the science actually shows. We set out both sides fairly.
            </p>
          </GradeRow>
          <GradeRow status="unseen">
            <p>
              The text speaks of the unseen (<Tr>al-ghayb</Tr>): angels, the Throne, the soul, the Hereafter. Science has no instrument for these, so it can neither
              confirm nor refute them.
            </p>
          </GradeRow>
          <GradeRow status="caution">
            <p>
              A popular claim that does not survive checking, because the verse doesn’t say it, the hadith is weak, or the “fact” is false. These are collected on{" "}
              <PageLink to="myths">Claims We Don’t Make</PageLink>.
            </p>
          </GradeRow>
        </div>
      ),
    },
    {
      kind: "section",
      id: "revelation-and-science-the-believers-starting-point",
      title: "Revelation and science: the believer’s starting point",
      body: (
        <Split>
          <div>
            <p>
              The Qur’an presents itself as coming from the Creator of the heavens and the earth, and it invites people to test that claim. One test it names
              explicitly is consistency: a book from anyone other than God would contain many contradictions.
            </p>
            <p>
              From this follows the position of Muslim scholarship through the centuries. Truth does not contradict truth. The universe is God’s creation and the
              Qur’an is God’s word, so a correct reading of the one cannot truly conflict with a correct understanding of the other. When they seem to conflict, the
              problem lies in <em>our</em> reading or in <em>our</em> science.
            </p>
            <details className="more mt-4">
              <summary className="font-mono text-[0.72rem] tracking-[0.08em] text-ink-3 uppercase hover:text-gold">Read more</summary>
              <div className="pt-4">
                <p>
                  For a believer the Qur’an is the fixed point. A scientific theory that contradicts a clear, unambiguous text is regarded as incomplete, however
                  popular it is, and history shows that confident theories do get overturned. At the same time, the tradition warns against the opposite error of
                  rejecting what has been genuinely demonstrated. Imam al-Ghazālī (d. 1111), one of the most respected scholars of Sunni Islam, wrote that a sincere
                  but mistaken person who rejects the demonstrated mathematics of eclipses in the name of religion does religion great harm, because the proof is
                  compelling and the religion is then made to look false (<Tr>al-Munqidh min al-Ḍalāl</Tr>).
                </p>
                <p>This site keeps both warnings in view. It holds to the text, it handles interpretations honestly, and it respects evidence.</p>
              </div>
            </details>
          </div>
          <div className="space-y-10">
            <Verse at="4:82" />
            <Verse at="3:7" />
          </div>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "science-revises-itself-and-that-is-a-strength",
      title: "Science revises itself, and that is a strength",
      body: (
        <>
          <p>
            Science is a method of asking nature questions and accepting its answers. The method makes progress precisely because it can correct itself, but that also
            means any particular theory can be improved on or replaced. A few famous examples:
          </p>
          <Timeline
            items={[
              {
                when: "1687 → 1915",
                title: "Newton refined by Einstein",
                body: (
                  <p>
                    Newton’s gravity explained almost everything in the Solar System, except that Mercury’s orbit slowly swings round (its perihelion precesses) about
                    43 arcseconds per century faster than Newton predicts. Einstein’s general relativity (1915) accounted for it exactly. Newton was not “wrong” for
                    everyday purposes, only incomplete.
                  </p>
                ),
              },
              {
                when: "1887",
                title: "The ether that wasn’t",
                body: (
                  <p>
                    Physicists were sure light travelled through an invisible “luminiferous ether”. The Michelson–Morley experiment failed to detect it, and relativity
                    later made it unnecessary.
                  </p>
                ),
              },
              {
                when: "1912 → 1960s",
                title: "Continental drift",
                body: (
                  <p>
                    Alfred Wegener proposed that continents move. He was largely dismissed for decades, until sea-floor spreading and plate tectonics vindicated the core
                    idea in the 1960s.
                  </p>
                ),
              },
              {
                when: "1948 → 1965",
                title: "A universe with a beginning",
                body: (
                  <p>
                    The “steady state” model of an eternal, unchanging universe was a serious rival to the Big Bang. The discovery of the cosmic microwave background in
                    1965 decided the question in favour of a beginning.
                  </p>
                ),
              },
            ]}
          />
          <Callout title="What this means for this site">
            <p>
              We never say the Qur’an “needs” science to be true, and we never tie a verse to a theory so tightly that the verse would seem to fall if the theory fell.
              We present science as the best current human understanding, with dates and data, and we let you see exactly how strong each correspondence is.
            </p>
          </Callout>
        </>
      ),
    },
    {
      kind: "section",
      id: "what-a-scientific-sign-is-and-isnt",
      title: "What a “scientific sign” is, and isn’t",
      body: (
        <Split>
          <div>
            <p>
              The Qur’an calls itself <em>guidance</em>, not a textbook. It does not set out to teach chemistry or astronomy. It points to the natural world as{" "}
              <Tr>āyāt</Tr>, “signs”, the same word it uses for its own verses. The sky, the embryo, the bee and the rain are all evidence that invites reflection on
              the Creator.
            </p>
            <p>
              So we should expect the Qur’an to speak about nature accurately, in language meaningful to a seventh-century Arab and to a twenty-first-century
              astrophysicist alike. We should not expect it to state equations. Many verses describe nature exactly as ordinary people see it, and they are true in
              that frame. A few use words so precise that later discoveries lend them surprising depth. Both are worth study, and neither should be exaggerated.
            </p>
            <p>Three rules we follow:</p>
            <ul>
              <li>
                <strong>Start from the Arabic.</strong> What does the word mean in the language of the time? What did the Companions and classical commentators say?
              </li>
              <li>
                <strong>State the science precisely.</strong> Who discovered it, when, and how certain is it?
              </li>
              <li>
                <strong>Grade the match honestly.</strong> Is it the plain meaning or one possible reading? Could the same words have fitted a different discovery?
              </li>
            </ul>
          </div>
          <div className="space-y-10">
            <Verse at="2:2" />
            <Verse at="17:36" />
          </div>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "our-sources",
      title: "Our sources",
      body: (
        <Split>
          <div>
            <h3>Scripture</h3>
            <ul>
              <li>
                <strong>Arabic text:</strong> Uthmani script from the Tanzil project, the standard <Tr>Ḥafṣ ʿan ʿĀṣim</Tr> reading with Kufan verse numbering (6,236
                verses).
              </li>
              <li>
                <strong>English:</strong> <em>Kanz-ul-Iman</em>, rendered into English by Mufti Abdun Nabi Hamidi. Words in (parentheses) are the translator’s
                explanatory additions.
              </li>
              <li>
                <strong>Hadith:</strong> primarily <Tr>Ṣaḥīḥ al-Bukhārī</Tr> and <Tr>Ṣaḥīḥ Muslim</Tr>, plus the Sunan collections where the grading is sound.
                Numbering and links follow sunnah.com, and gradings are stated.
              </li>
              <li>
                <strong>Commentary:</strong> classical tafsīr, especially al-Ṭabarī, al-Qurṭubī, Fakhr al-Dīn al-Rāzī and Ibn Kathīr.
              </li>
            </ul>
          </div>
          <div>
            <h3>Science</h3>
            <ul>
              <li>Standard university textbooks and review articles.</li>
              <li>Scientific agencies: NASA, ESA, the U.S. Geological Survey, NOAA.</li>
              <li>Primary discoveries cited by author and year, such as Hubble (1929) and Penzias &amp; Wilson (1965).</li>
              <li>Numbers are rounded, and where values are uncertain we say so.</li>
            </ul>
            <p>
              The full list is on <PageLink to="references">Sources &amp; References</PageLink>.
            </p>
          </div>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "please-verify-and-please-correct-us",
      title: "Please verify, and please correct us",
      body: (
        <Split>
          <div>
            <p>
              The Qur’an tells believers to verify news before acting on it. That applies to this website too. Click the verse links, read the hadith in their
              collections, and look up the science. If you find an error in a reference, a translation or a scientific detail, please write to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> with the source. Corrections are welcome and will be made.
            </p>
          </div>
          <Verse at="49:6" />
        </Split>
      ),
    },
  ],
} satisfies Page;
