import type { Page } from "../define";
import { Split, Tr, Word } from "@/components/content/Text";
import { PageLink } from "@/components/content/PageLink";
import { Verse } from "@/components/scripture/Verse";

export default {
  slug: "myths",
  title: "Claims We Don’t Make",
  navTitle: "Claims We Don’t Make",
  description:
    "Popular stories and “scientific miracle” claims that are false, weakly sourced or overstated, and why an honest presentation serves the Qur’an far better than exaggeration.",
  hook: "Viral stories that are false or overstated, and why honesty serves the Qur’an better than exaggeration.",
  part: "integrity",
  scale: null,
  scene: "cosmos",
  flow: [
    {
      kind: "section",
      id: "why-this-page-exists",
      title: "Why this page exists",
      body: (
        <Split>
          <div>
            <p>
              The Qur’an commands believers to verify news before passing it on, and not to mix truth with falsehood. Many well-meant claims circulate on social
              media: a famous astronaut who converted, a NASA photo, a number code. When a sceptical friend checks and finds one of them false, the damage falls on the
              Qur’an’s reputation, not on the claim.
            </p>
            <p>
              So here are claims this site deliberately does <em>not</em> make, with the reasons. None of them is needed. The Qur’an’s truth does not depend on any of
              them.
            </p>
          </div>
          <aside className="space-y-10">
            <Verse at="49:6" />
            <Verse at="2:42" />
          </aside>
        </Split>
      ),
    },
    {
      kind: "topic",
      id: "armstrong",
      status: "caution",
      title: "“Neil Armstrong heard the call to prayer on the Moon and became Muslim”",
      scripture: [],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>False.</strong> The story spread so widely in the early 1980s that in 1983 the U.S. State Department circulated a statement in which Armstrong
              himself said he had not converted and had not heard the <Tr>adhān</Tr> on the Moon. He repeated this in later years. There is also a basic problem: the
              Moon has no air, and sound cannot travel through a vacuum. Astronauts talk to each other by radio.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "moon-split-photo",
      status: "caution",
      title: "“NASA photographs prove the Moon was split”",
      scripture: [{ verse: "54:1", to: "54:2" }, { hadith: "bukhari:3868" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>The photo shows something else.</strong> The viral image is of <em>Rima Ariadaeus</em>, a lunar rille, a long valley formed by the crust
              pulling apart, about 300 km long and up to 5 km wide. In 2010 NASA scientist Brad Bailey stated that there is no current scientific evidence that the
              Moon was split into two parts and rejoined.
            </p>
          ),
          more: (
            <p>
              <strong>What Muslims actually believe.</strong> The splitting of the Moon is a miracle affirmed by the Qur’an and by authentic hadith. A miracle is, by
              definition, a break in the ordinary course of nature, done by God as a sign. Believers accept it on the strength of revelation and reliable eyewitness
              reports, not on geology. Tying it to a misread photograph adds nothing, and a sceptic can easily discredit that link.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "6666",
      status: "caution",
      title: "“The Qur’an has 6,666 verses”",
      scripture: [],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>No.</strong> The standard Kufan count, used in the most widely printed <Tr>muṣḥaf</Tr>, gives <strong>6,236</strong> verses. The classical
              counting traditions of Madinah, Makkah, Basra and Syria give slightly different totals, roughly 6,204 to 6,236. They differ only in where some verse
              divisions fall, not in the text itself. The number 6,666 is a popular exaggeration with no basis in any of them.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "speed-of-light",
      status: "caution",
      title: "“The speed of light can be calculated from verse 32:5”",
      scripture: [{ verse: "32:5" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>Not supported.</strong> A widely shared calculation treats “a thousand years in your calculation” as 12,000 lunar orbits, then applies several
              hand-picked adjustments: which kind of month to use, which part of the Moon’s path to count, and a correction angle. Each choice is made so that the
              result lands near 299,792 km/s. With different, equally defensible choices, the answer changes completely.
            </p>
          ),
          more: (
            <p>
              The verse itself speaks of God planning “the matters (of everything)”, which then “return to Him”. It is not about light. Its real resonance with
              physics, that time is relative to the observer, is discussed on <PageLink to="physics">Time, Matter &amp; Balance</PageLink>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "egg-shaped-earth",
      status: "caution",
      title: "“The Qur’an says the Earth is egg-shaped (79:30)”",
      scripture: [{ verse: "79:30", to: "79:31" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>The word does not mean that.</strong> <Word ar="دَحَىٰهَا" tr="daḥāhā" /> means “He spread it out”, and the very next verse explains it:
              “therefrom (He) produced its water and pasture”. A related noun, <Tr>udḥiyy</Tr>, is the shallow hollow an ostrich scrapes and smooths on the ground
              for its eggs. It is the nest, not the egg. And the Earth is not egg-shaped anyway. It is very slightly flattened at the poles (an oblate spheroid),
              which is the opposite of an egg’s elongation.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "china",
      status: "caution",
      title: "“Seek knowledge, even if you have to go to China”",
      scripture: [],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>Very weakly sourced.</strong> Hadith specialists graded this wording very weak, and some, such as Ibn al-Jawzī, listed it among fabricated
              reports. Its meaning, that one should strive hard for knowledge, is supported by authentic hadith, so there is no need to use it. Use instead: “Seeking
              knowledge is a duty upon every Muslim” and “Whoever treads a path seeking knowledge, Allah makes easy for him a path to Paradise” (
              <Tr>Ṣaḥīḥ Muslim</Tr> 2699). See <PageLink to="knowledge">Knowledge &amp; Reflection</PageLink>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "seas-never-mix",
      status: "caution",
      title: "“Two oceans meet, and never mix”",
      scripture: [],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>Overstated.</strong> A famous video, often said to show two oceans meeting, is usually of the Gulf of Alaska. It shows pale, sediment-laden
              meltwater from glaciers meeting darker ocean water. Such boundaries are real and can be sharp, but the waters <em>do</em> mix gradually. Verse 55:20
              speaks of a <Tr>barzakh</Tr>, a barrier or transition zone, which is exactly what oceanographers describe. Saying “they never mix” is both false and
              unnecessary. See{" "}
              <PageLink to="earth" hash="barrier-between-seas">
                the barrier between two seas
              </PageLink>
              .
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "earthquakes",
      status: "caution",
      title: "“Science proved mountains stop earthquakes”",
      scripture: [],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>No.</strong> Mountain belts such as the Himalaya are among the most earthquake-prone places on Earth, because they form where tectonic plates
              collide. What geology does confirm is that mountains have deep roots (isostasy). The meaning of “that it may not tremble along with you” is a matter of
              interpretation. See{" "}
              <PageLink to="earth" hash="mountains-as-pegs">
                mountains as pegs
              </PageLink>
              .
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "kaaba-centre",
      status: "caution",
      title: "“Makkah is the exact centre of the Earth / the magnetic zero point”",
      scripture: [],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>No scientific basis.</strong> The surface of a sphere has no centre. Claims that Makkah is the centre of the land masses depend on the map
              projection and method chosen. Lines of zero magnetic declination drift continually as Earth’s magnetic field changes, so they do not stay fixed on any
              city. And the “golden ratio” claim about Makkah’s latitude is off by 0.4% (see{" "}
              <PageLink to="mathematics" hash="pattern-or-coincidence-how-to-tell">
                Pattern or coincidence?
              </PageLink>
              ). Makkah’s honour comes from God’s choosing it, not from geometry.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "pharaoh-salt",
      status: "caution",
      title: "“Salt found in the mummy proves this Pharaoh drowned”",
      scripture: [{ verse: "10:92" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>Unproven.</strong> Egyptian embalmers dried bodies with <em>natron</em>, a natural salt mixture, so salt in a mummy is expected and proves
              nothing about drowning. Historians also do not agree on which Pharaoh was the Pharaoh of Moses. The verse’s promise, that his body would be preserved as
              a sign for later generations, is a statement of faith. It does not need an identification that experts dispute.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "famous-quotes",
      status: "caution",
      title: "Quotes from famous scientists praising the Qur’an",
      scripture: [],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>Check before sharing.</strong> Many quotations attributed to Einstein, Hawking and others about Islam or the Qur’an circulate with no book,
              letter, lecture or date that anyone can find. If a quote has no verifiable original source, it should not be shared. And the Qur’an does not need a
              celebrity’s endorsement.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "code-19",
      status: "caution",
      title: "“A mathematical code proves the Qur’an”",
      scripture: [],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <strong>Handle with great care.</strong> Some numerical facts about the Qur’an are real and verifiable, and we list them on{" "}
              <PageLink to="mathematics" hash="nineteen">
                Numbers &amp; Mathematics
              </PageLink>
              . But the most famous “code” theory, Rashad Khalifa’s 19-code, ended with its author declaring two verses (9:128–129) to be forgeries because they did
              not fit his counts. Muslim scholars of every school rejected that. A theory that has to change the text to survive has failed. The Qur’an’s
              preservation and its guidance are its proof, not number games.
            </p>
          ),
        },
      ],
    },
  ],
} satisfies Page;
