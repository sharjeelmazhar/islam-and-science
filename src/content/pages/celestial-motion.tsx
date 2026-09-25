import type { Page } from "../define";
import { Tr, Word } from "@/components/content/Text";
import { PageLink } from "@/components/content/PageLink";
import { Hadith } from "@/components/scripture/Hadith";
import { OrbitsViz } from "@/components/viz/OrbitsViz";

export default {
  slug: "celestial-motion",
  title: "Orbits & Celestial Motion",
  navTitle: "Orbits & Celestial Motion",
  description:
    "“Each one floats in an orbit.” The Qur’an on the Sun, the Moon, day and night, set beside what astronomy measures, with an interactive 3D model you can view from the Sun, from the Earth, or travelling through the galaxy.",
  hook: "“Each one floats in an orbit.” Sun, Moon, day and night, with a 3D model you can view from different frames of reference.",
  part: "horizons",
  scale: 13,
  scene: "solar",
  stats: [
    { value: "27.3 days", label: "The Moon’s orbit around Earth, relative to the stars (29.5 days from new moon to new moon)" },
    { value: "365.25 days", label: "Earth’s orbit around the Sun, at about 30 km/s" },
    { value: "≈ 230 km/s", label: "The Sun’s speed around the centre of the Milky Way" },
    { value: "≈ 230 Myr", label: "One “galactic year”: a single lap of the Sun around the galaxy (estimates 225–250 million years)" },
  ],
  flow: [
    {
      kind: "topic",
      id: "each-in-an-orbit",
      status: "established",
      title: "“Each one floats in an orbit”",
      lede: "Twice the Qur’an says the Sun and the Moon each float in a falak, an orbit, using a verb of swimming or floating.",
      scripture: [{ verse: "21:33" }, { verse: "36:40" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="فَلَك" tr="falak" /> means a rounded path or sphere of revolution. Classical lexicographers compared it to the round whorl of a spindle (<Tr>falkat al-mighzal</Tr>). <Word ar="يَسْبَحُونَ" tr="yasbaḥūn" /> means “they swim” or “float”, describing smooth, continuous motion by the body itself, not something dragged along. The plural verb suits a group of more than two, so the verse may refer to the night, the day, the Sun and the Moon together, or to celestial bodies generally.
            </p>
          ),
          more: <p>36:40 adds that it is not befitting for the Sun to “overtake” the Moon. Each keeps to its own course.</p>,
        },
        {
          heading: "What science says",
          gist: (
            <ul>
              <li>The Moon orbits Earth every 27.3 days at an average distance of 384,400 km, and it is slowly moving away, by about 3.8 cm per year (measured by laser ranging to reflectors left on the Moon).</li>
              <li>The Sun is not at rest. It orbits the centre of the Milky Way at roughly 230 km/s, carrying the whole Solar System with it. It also moves at about 20 km/s relative to nearby stars, towards the constellation Hercules, and it spins on its own axis about once every 25 days at its equator.</li>
            </ul>
          ),
          more: (
            <ul>
              <li>Every one of these motions is in its own path. The Sun and the Moon never “catch up” with each other in the sense of sharing an orbit.</li>
            </ul>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The plain meaning, that the Sun and the Moon each move continuously in their own path, is exactly right. In the seventh century, most people thought the Sun’s motion was simply its daily trip across the sky. The Qur’an’s wording fits the modern picture of the Sun in its own vast orbit equally well. We grade this <em>consistent with established science</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "section",
      id: "explore-one-solar-system-three-points-of-view",
      title: "Explore: one Solar System, three points of view",
      body: (
        <>
          <OrbitsViz start="helio" />
          <p className="text-sm text-ink-3">
            Drag to rotate; pinch to zoom on touch screens, or focus the model and use the arrow keys and +/−. Real orbital periods, simplified to circular orbits in one plane. Planet sizes and the Moon’s distance are enlarged so you can see them. The Earth-centred view is discussed on <PageLink to="earths-motion">The Earth’s Motion: A Classical Debate</PageLink>.
          </p>
        </>
      ),
    },
    {
      kind: "topic",
      id: "sun-runs",
      status: "established",
      title: "“The sun moves towards its final point”",
      lede: "The Sun is described as moving (tajrī, literally “running”) “towards its final point”, and each of the Sun and Moon as running “in accordance to a fixed term”.",
      scripture: [{ verse: "36:38" }, { verse: "13:2" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="لِمُسْتَقَرٍّ لَّهَا" tr="li-mustaqarrin lahā" /> can mean “to its place of rest”, “to its appointed time”, or “to its settled course”. The translation shown explains it as the Sun’s final end on the Day of Judgement. 13:2 adds that the Sun and Moon each run “in accordance to a fixed term” (<Tr>li-ajalin musammā</Tr>), a fixed lifespan.
            </p>
          ),
          more: (
            <>
              <p>
                The Prophet ﷺ linked this verse to the Sun’s prostration beneath the Throne. Scholars explain this as a matter of the unseen. All creation prostrates to God in a manner we do not perceive (see 22:18), and the Throne encompasses the whole universe.
              </p>
              <Hadith k="bukhari:3199" />
            </>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              The Sun really does “run”. It travels around the galaxy at about 230 km/s, which is roughly 7 billion kilometres every year. And it really does have a “fixed term”. The Sun is about 4.6 billion years old, and it will exhaust the hydrogen in its core in roughly 5 billion years, swell into a red giant, and end as a white dwarf. Every star has a finite life set by its mass.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              That the Sun moves and has a finite, appointed term is fully consistent with astronomy. What its <Tr>mustaqarr</Tr> ultimately is, and the prostration described in the hadith, belong to the unseen, and we do not try to identify them with a physical location.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "two-easts",
      status: "established",
      title: "“The Lord of both the Easts, and the Lord of both the Wests”",
      lede: "A precise piece of observational astronomy that classical commentators understood exactly as astronomers do.",
      scripture: [{ verse: "55:17" }, { verse: "70:40" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              55:17 speaks of <em>two</em> easts and two wests. 70:40 speaks of many easts and wests (<Tr>al-mashāriq wa’l-maghārib</Tr>). Ibn Kathīr explains the two easts as “the sunrise of summer and the sunrise of winter”, with the two wests likewise. The plural refers to the Sun rising at a different point every day between those two extremes.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              Because Earth’s axis is tilted about 23.4°, the point on the horizon where the Sun rises moves north and south through the year. It reaches its extremes at the June and December solstices, and it rises due east only at the equinoxes. At the latitude of Makkah (21.4° N) the sunrise point swings about 25° either side of due east. At London (51.5° N) it swings about 40°.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              Exact, and understood that way from the beginning. We grade this <em>consistent with established science</em>. It is a good example of the Qur’an describing nature precisely, in terms anyone who watches the horizon can verify.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "lamp-and-light",
      status: "established",
      title: "The Sun a lamp, the Moon a light",
      lede: "The Qur’an consistently uses different words for the Sun and the Moon: the Sun is a sirāj (lamp) and ḍiyāʾ (radiance), while the Moon is nūr (light) and munīr (illuminated).",
      scripture: [{ verse: "71:16" }, { verse: "10:5" }, { verse: "78:13" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              A <Word ar="سِرَاج" tr="sirāj" /> is a lamp, something that burns and gives out its own light and heat. <Tr>Wahhāj</Tr> (78:13) adds “blazing”. The Moon is never called a <Tr>sirāj</Tr>. It is <Tr>nūr</Tr>, light, and <Tr>munīr</Tr>, light-giving or lit up (25:61).
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              The Sun generates its own light by nuclear fusion in its core, radiating about 3.8 × 10<sup>26</sup> watts. The Moon produces no light of its own. It reflects sunlight, and it is actually quite dark, reflecting only about 12% of the light that falls on it.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The Qur’an’s consistent vocabulary fits the physics perfectly. To be fair, some ancient thinkers, such as the Greek philosopher Anaxagoras, had already argued that moonlight is reflected sunlight, so this was not unknowable in the seventh century. What stands out is the Qur’an’s consistency across many verses. We grade this <em>consistent with established science</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "night-wraps-day",
      status: "interpretive",
      title: "Night coiled over day, and the shape of the Earth",
      lede: "The Qur’an describes night and day being wound around each other, the verb used for winding a turban.",
      scripture: [{ verse: "39:5" }, { verse: "36:37" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="يُكَوِّرُ" tr="yukawwiru" /> comes from <Tr>k-w-r</Tr>, used for winding a turban round and round the head (<Tr>kawwara al-ʿimāmah</Tr>). The image is of night and day continually wrapping around one another. 36:37 uses a different image. God “strips” or peels (<Tr>naslakhu</Tr>) the day away from the night, revealing darkness as if it lay underneath.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              On a spherical, turning Earth, half the globe is always in daylight and half in night. The boundary between them, the terminator, sweeps continuously around the planet. Night and day chase each other endlessly, exactly like a cloth wound around a sphere. Space itself is dark, and daylight is a thin layer of scattered sunlight in our atmosphere.
            </p>
          ),
        },
        {
          heading: "What classical scholars said about the Earth’s shape",
          gist: (
            <p>
              Muslim scholars widely held that the Earth is a sphere. Fakhr al-Dīn al-Rāzī (d. 1210) answered people who thought the Qur’an’s description of the Earth as a “resting place” (<Tr>firāsh</Tr>, literally a bed, 2:22) meant it was flat. He said a sphere, when it is very large, looks flat to anyone standing on it, so the Earth can be a sphere and still be a bed.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The imagery sits naturally with a round Earth, but the verses do not state the Earth’s shape directly. We grade this a <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "reckoning",
      status: "established",
      title: "“The sun and the moon are programmed”",
      lede: "The Qur’an presents the heavens as predictable and measurable. That is the founding assumption of astronomy, and the reason Muslims became expert astronomers.",
      scripture: [{ verse: "55:5" }, { verse: "17:12" }, { verse: "2:189" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="بِحُسْبَانٍ" tr="bi-ḥusbān" /> means “by calculation, by exact reckoning”, which the translation shown renders as “programmed (moving on a fixed orbit)”. 17:12 says night and day were made so that people “come to know the calculation of the years and the counting (of time)”. The new moons (<Tr>ahillah</Tr>) are “indicators of time” (2:189). The Islamic calendar is lunar: each month begins with the new crescent, and there are twelve months (9:36).
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              Celestial motions are regular enough to predict eclipses centuries in advance to within seconds. The Moon’s phases repeat every 29.53 days on average, so twelve lunar months make 354.37 days, about 11 days shorter than a solar year. That is why Ramadan moves through the seasons, completing a full cycle in about 33 years.
            </p>
          ),
        },
        {
          heading: "From verse to observatory",
          gist: (
            <p>
              The need to fix prayer times, the direction of Makkah (<Tr>qiblah</Tr>) and the start of lunar months made astronomy a religious science. Muslim astronomers built observatories at Marāgha (1259) and Samarkand (1420s) and produced highly accurate tables. See <PageLink to="scholars">Muslim Scientists</PageLink>.
            </p>
          ),
          more: (
            <>
              <Hadith k="bukhari:1043" />
              <p className="text-sm text-ink-3">
                When the sun eclipsed on the day his son died, people assumed a link. The Prophet ﷺ rejected the superstition immediately. Eclipses are signs of God, governed by His laws, not reactions to human events.
              </p>
            </>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "shadows",
      status: "established",
      title: "The sun “a proof for it”: shadows",
      lede: "A verse about shadows is also, in practice, the basis of Islamic timekeeping.",
      scripture: [{ verse: "25:45", to: "25:46" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              God spread out the shade, could have made it stationary, and made the Sun “a proof for it” (<Tr>dalīl</Tr>, an indicator or guide). Then He “gradually folded it”.
            </p>
          ),
        },
        {
          heading: "What science says, and how Muslims used it",
          gist: (
            <p>
              A shadow’s length and direction are set entirely by the Sun’s altitude and bearing. At noon the shadow is shortest, and in the afternoon it lengthens steadily. This is the principle of the sundial. Islamic law defines prayer times by it. <Tr>Ẓuhr</Tr> begins just after the Sun passes its highest point. For <Tr>ʿAṣr</Tr>, most schools start the time when an object’s shadow equals its length plus its noon shadow, and the Ḥanafī school when it equals twice its length plus its noon shadow. Muslim astronomers produced detailed shadow tables for every latitude.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The verse describes the Sun-shadow relationship accurately, and it became the basis of a practical science. We grade this <em>consistent with established science</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "moon-phases",
      status: "established",
      title: "“Till it becomes like a dried (i.e. curved) branch of a date tree”: the Moon’s phases",
      scripture: [{ verse: "36:39" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              The Moon passes through “phases” (<Tr>manāzil</Tr>, literally stations) “till it becomes like a dried (i.e. curved) branch of a date tree”, an <Tr>ʿurjūn qadīm</Tr>, the old, dried, curved stalk of a date cluster. That is a perfect image of the thin, pale crescent at the end of the month.
            </p>
          ),
          more: (
            <p>
              Phases happen because we see different fractions of the Moon’s sunlit half as it orbits Earth. The Moon also moves through about 13° of sky each day against the stars, and the Arabs traditionally divided its monthly path into 28 “stations”, the <Tr>manāzil al-qamar</Tr>.
            </p>
          ),
        },
      ],
    },
  ],
} satisfies Page;
