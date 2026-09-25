import type { Page } from "../define";
import { Callout, Quote, Tr, Word } from "@/components/content/Text";
import { ExpansionViz } from "@/components/viz/ExpansionViz";

export default {
  slug: "cosmology",
  title: "Origin & Expansion of the Universe",
  navTitle: "Origin & Expansion",
  description:
    "A joined mass split apart, a heaven of “smoke”, and a sky that God is expanding, set beside the Big Bang, the cosmic microwave background and Hubble’s discovery, with an honest grade for each.",
  hook: "A joined mass split apart, a sky of “smoke”, and a heaven that is being expanded, set beside the Big Bang and Hubble’s discovery.",
  part: "horizons",
  scale: 26,
  scene: "cosmos",
  stats: [
    { value: "13.8 bn yrs", label: "Age of the universe (Planck satellite, 2018: 13.787 ± 0.020 billion years)" },
    { value: "1927–29", label: "Expansion inferred by Lemaître, then Hubble’s velocity–distance law" },
    { value: "2.725 K", label: "Temperature of the afterglow of the early universe, discovered 1965" },
    { value: "≈ 70", label: "Expansion rate today, in km/s per megaparsec (measurements range 67–73)" },
  ],
  flow: [
    {
      kind: "topic",
      id: "joined-then-split",
      status: "interpretive",
      title: "“Closed up (as one piece), We henceforth opened them”",
      lede: "A verse that many readers today set beside the Big Bang, and one whose classical readings are just as interesting.",
      scripture: [{ verse: "21:30" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="رَتْقًا" tr="ratq" /> means something closed up, stitched or fused together with no opening. <Word ar="فَتَقْنَا" tr="fataqnā" /> means “We
              unstitched, split open”. The verse says the heavens and the earth were once “closed up (as one piece)”, and that God “opened (i.e. parted)” them.
            </p>
          ),
          more: (
            <p>
              Classical commentators recorded more than one reading. Ibn Kathīr gives as the primary meaning that “in the beginning they were all one piece, attached
              to one another… then He separated them”. Another early reading, also reported from the Companions, is that the sky was “closed” (no rain fell) and the
              earth was “closed” (nothing grew), and God opened the one with rain and the other with plants. The verse continues with water and life, which fits that
              second reading well.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              Modern cosmology holds that everything in the observable universe, all its matter and energy, was once packed into an extremely hot, dense state about
              13.8 billion years ago, and has been expanding and cooling ever since. This is the Big Bang model, first proposed by the Belgian priest-physicist Georges
              Lemaître (1927, and his “primeval atom” of 1931). It was confirmed by the discovery of the cosmic microwave background by Arno Penzias and Robert Wilson
              in 1965, for which they received the 1978 Nobel Prize.
            </p>
          ),
          more: (
            <p>
              One subtlety: the Big Bang was not an explosion of matter <em>into</em> empty space. It describes space itself expanding from a hot, dense beginning.
              Physics cannot yet describe the very first instant.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The first reading, a single fused mass that was split apart, matches the broad picture of a unified beginning remarkably well, and it was the primary
              meaning for scholars like Ibn Kathīr long before modern cosmology. But the verse is short and general, and it is not a technical description of the Big
              Bang. We grade it a strong <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "smoke",
      status: "interpretive",
      title: "“The heaven… and it was smoke”",
      lede: "The Qur’an describes the early heaven as dukhān, smoke. Astronomers describe star-forming material as clouds of gas and fine dust.",
      scripture: [{ verse: "41:11" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="دُخَانٌ" tr="dukhān" /> is the ordinary Arabic word for smoke, a mixture of hot gas and fine suspended particles. Several classical
              commentators linked it to a vapour rising from water.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              For its first 380,000 years the universe was a glowing plasma. After it cooled enough for atoms to form, it was filled with dark, neutral gas, mostly
              hydrogen and helium. The first stars and galaxies condensed from that gas a few hundred million years later.
            </p>
          ),
          more: (
            <p>
              Stars are still born today inside clouds of gas and dust. The Pillars of Creation in the Eagle Nebula are a famous example. Interstellar dust grains are
              typically around a tenth of a micrometre across, similar in size to the particles in smoke.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              “Smoke” is an apt everyday word for a hot, dark mixture of gas and fine particles, and it is a striking choice. The verse also belongs to a passage
              (41:9–12) whose sequence of creation scholars have discussed at length, and it is not a physical model. We grade it a <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "expanding-universe",
      status: "interpretive",
      title: "“It is We Who give vastness”",
      lede: "Perhaps the best-known verse in discussions of Qur’an and cosmology. The Arabic genuinely supports the reading, and so does the history of the discovery.",
      scripture: [{ verse: "51:47" }],
      aside: (
        <Callout title="A note on the history">
          <p>
            The expanding universe is sometimes credited to Stephen Hawking. In fact, expansion was discovered in the 1920s by Alexander Friedmann (theory, 1922),
            Georges Lemaître (1927) and Edwin Hubble (observations, 1929). Hawking’s famous contribution came later. With Roger Penrose (around 1970) he proved that,
            under general relativity, an expanding universe must have begun from a singularity. In other words, the universe had a <em>beginning</em>.
          </p>
        </Callout>
      ),
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="لَمُوسِعُونَ" tr="la-mūsiʿūn" /> is an active participle from the root <Tr>w-s-ʿ</Tr>, “to be wide, vast”. The form <Tr>awsaʿa</Tr> means “to
              make wide, extend”. An active participle in Arabic can describe an ongoing activity, “We are the ones making it vast”, as well as a permanent attribute.
              The phrase <Tr>bi-aydin</Tr> was explained by Ibn ʿAbbās as “with strength”.
            </p>
          ),
          more: (
            <p>
              Classical commentators, who had no idea of an expanding cosmos, explained the phrase as “We made it vast” (Ibn Kathīr) or as “We are possessors of vast
              power and means”. The translation shown here, “it is We Who give vastness”, keeps the same openness. Both meanings are linguistically sound.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <ul>
              <li>
                <strong>1917:</strong> Einstein, like almost everyone else, assumed the universe was static. He added a “cosmological constant” to his equations to keep it that way.
              </li>
              <li>
                <strong>1922:</strong> Alexander Friedmann showed that Einstein’s equations naturally allow an expanding universe.
              </li>
            </ul>
          ),
          more: (
            <ul>
              <li>
                <strong>1927:</strong> Georges Lemaître derived the expansion and estimated its rate from galaxy data.
              </li>
              <li>
                <strong>1929:</strong> Edwin Hubble published the relation between galaxies’ distances and their recession speeds. Since 2018 the International Astronomical Union recommends calling it the <em>Hubble–Lemaître law</em>.
              </li>
              <li>
                <strong>1998:</strong> Two teams discovered that the expansion is <em>accelerating</em> (Nobel Prize 2011: Perlmutter, Schmidt, Riess).
              </li>
            </ul>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The Arabic comfortably bears the meaning “We are expanding it”, and the verse was revealed some thirteen centuries before scientists accepted that the
              universe expands. It was not read that way classically, though, and the word can also mean vastness or power. We grade it a <em>possible reading</em>,
              and among the most compelling ones.
            </p>
          ),
        },
      ],
    },
    {
      kind: "section",
      id: "see-it-expanding-space",
      title: "See it: expanding space",
      body: (
        <>
          <ExpansionViz />
          <p>
            <strong>What to notice:</strong> the galaxies do not fly apart through space. Space itself stretches (watch the grid), and the galaxies are carried along.
            Click a different galaxy and you get the same picture: everyone sees everyone else receding, and the farther away a galaxy is, the faster it recedes.
            Galaxies themselves do not grow, because gravity holds them together. The growth rate here is illustrative.
          </p>
        </>
      ),
    },
    {
      kind: "topic",
      id: "six-days",
      status: "interpretive",
      title: "Creation in six “days”",
      lede: "The Qur’an says the heavens and earth were created in six ayyām, and elsewhere shows that a “day” with God is not a day of twenty-four hours.",
      scripture: [{ verse: "7:54" }, { verse: "22:47" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="أَيَّام" tr="ayyām" /> (singular <Tr>yawm</Tr>) means days, but in Arabic <Tr>yawm</Tr> is also used for an era or a decisive period, as in
              “the days of the Arabs”, meaning their famous battles. The Qur’an itself speaks of a Day “like a thousand years of your calculation” (22:47) and of a Day
              whose duration is “fifty thousand years” (70:4).
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              The universe is about 13.8 billion years old, the Sun and Earth about 4.6 and 4.54 billion years. Science describes creation as a sequence of long
              epochs, not a single week.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              Reading the six “days” as six stages or periods is a long-standing interpretation, not a modern invention, and it removes any conflict with cosmic
              time-scales. The Qur’an does not say how long each period was, and attempts to map the six onto specific scientific epochs are speculative. We grade
              this a <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "many-worlds",
      status: "interpretive",
      title: "“Lord of the worlds”: a medieval scholar imagines other universes",
      lede: "The second verse of the Qur’an calls God Rabb al-ʿālamīn, Lord of the worlds, in the plural. In the twelfth century Fakhr al-Dīn al-Rāzī argued that this leaves room for worlds beyond our own.",
      scripture: [{ verse: "1:2" }],
      aside: (
        <Quote
          by={<strong>Fakhr al-Dīn al-Rāzī (d. 1210)</strong>}
          cite={
            <>
              commenting on “Lord of the worlds”. Our paraphrase of his argument for <Tr>alfa alfi ʿawālim</Tr>, “a thousand thousand worlds”.
            </>
          }
        >
          …it is established by proof that beyond the world there is an unending void, and it is established that God has power over all possible things. So He is
          able to create thousands upon thousands of worlds beyond this world, each of them greater and more massive than this world.
        </Quote>
      ),
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Tr>ʿĀlamīn</Tr> is the plural of <Tr>ʿālam</Tr>, “world”. Most commentators take it to mean all the kinds of created beings: humans, jinn, angels,
              animals. Al-Rāzī went further and argued that nothing in revelation or reason rules out other worlds beyond ours, and that God’s power certainly extends
              to them.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              The observable universe is about 93 billion light-years across and contains hundreds of billions of galaxies, perhaps more. Estimates range up to about
              two trillion. Each galaxy holds billions of stars, and most stars have planets.
            </p>
          ),
          more: (
            <p>
              Whether anything exists <em>beyond</em> our observable universe, such as a “multiverse”, is an open and speculative question. Some cosmological theories
              predict it, but there is no observational evidence either way.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The verse does not describe astrophysics. It does show that classical Muslim theology was comfortable with a creation far vaster than people could see,
              eight centuries before the telescope revealed it. We grade al-Rāzī’s reading a <em>possible reading</em>, and the multiverse itself remains unproven.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "seven-heavens",
      status: "unseen",
      title: "The seven heavens",
      lede: "The Qur’an speaks of seven heavens in layers. Some modern writers map them onto layers of the atmosphere. We do not.",
      scripture: [{ verse: "67:3" }, { verse: "2:29" }],
      steps: [
        {
          heading: "What the texts say",
          gist: (
            <p>
              The seven heavens are described as layered one above another (<Tr>ṭibāqan</Tr>), with the lower heaven “adorned… with lamps (i.e. stars)” (67:5). The
              hadith of the Night Journey (<Tr>al-Miʿrāj</Tr>) describes the Prophet ﷺ ascending through them. Each heaven has a gate, and in them he meets earlier
              prophets. These are realities of the unseen.
            </p>
          ),
        },
        {
          heading: "Why we don’t map them onto science",
          gist: (
            <p>
              The atmosphere is usually divided into five main layers (troposphere, stratosphere, mesosphere, thermosphere, exosphere), and other schemes give other
              numbers. Matching seven heavens to any such list requires choosing a scheme to fit, and it clashes with the Qur’an’s own statement that the{" "}
              <em>stars</em> adorn the <em>lower</em> heaven. Stars lie far beyond any atmospheric layer. The honest position is that the seven heavens belong to
              the unseen, and science has nothing to say about them either way.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "the-end",
      status: "unseen",
      title: "The end: “We shall roll up the heavens”",
      lede: "The Qur’an describes the end of the present cosmos as an act of God on the Last Day. Cosmology studies how the universe would evolve if left to its own laws.",
      scripture: [{ verse: "21:104" }, { verse: "81:1", to: "81:2" }],
      steps: [
        {
          heading: "What the texts say",
          gist: (
            <p>
              The heavens will be rolled up “as the angel Sijill rolls up the books of deeds”. This translation follows the classical view that <Tr>al-sijill</Tr>{" "}
              names an angel, while others take it to mean a written scroll. Creation will be restored as it was first made.
            </p>
          ),
          more: (
            <p>
              Elsewhere the Qur’an says “the sunlight is rolled up” and “the stars shall fall off”. These describe the Hour, which the Qur’an presents as a decree of
              God, not the slow result of natural processes.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <ul>
              <li>The Sun has converted roughly half of the hydrogen in its core into helium. In about 5 billion years it will swell into a red giant and then shrink to a white dwarf.</li>
              <li>For the universe as a whole, the “Big Crunch”, where expansion reverses and everything collapses, was once a popular scenario. Since 1998 the evidence has favoured continued, accelerating expansion.</li>
            </ul>
          ),
          more: (
            <ul>
              <li>Recent surveys (for example DESI, 2024–25) hint that dark energy may be changing over time. The ultimate fate of the universe is still an open question.</li>
            </ul>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              People sometimes link 21:104 to the Big Crunch. That parallel depends on a scenario current data do not favour, and it treats a description of the Hour
              as a prediction of physics. We classify it as <em>beyond empirical science</em>. The verse’s own claim, that the One who began creation can repeat it,
              is a statement about God’s power.
            </p>
          ),
        },
      ],
    },
  ],
} satisfies Page;
