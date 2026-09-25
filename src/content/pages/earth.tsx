import type { Page } from "../define";
import { Tr, Word } from "@/components/content/Text";
import { IsostasyLab } from "@/labs/ui";

export default {
  slug: "earth",
  title: "Mountains, Seas & Sky",
  navTitle: "Mountains, Seas & Sky",
  description:
    "Mountains as pegs with deep roots, the barrier between two seas, darkness and waves in the deep ocean, towering clouds and hail, fertilising winds, the water cycle and the protective sky. Earth science beside the Qur’an.",
  hook: "Mountains as pegs with deep roots, the barrier between seas, darkness and internal waves, the water cycle.",
  part: "horizons",
  scale: 7,
  scene: "earth",
  flow: [
    {
      kind: "topic",
      id: "mountains-as-pegs",
      status: "interpretive",
      title: "“And the mountains as pegs”",
      lede: "The Qur’an compares mountains to awtād, the stakes that hold a tent down. Geology found that mountains do have deep roots, often several times deeper than they are tall.",
      scripture: [{ verse: "78:6", to: "78:7" }, { verse: "16:15" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="أَوْتَادًا" tr="awtādā" /> means pegs or stakes. A tent peg is mostly <em>below</em> ground, and its job is to hold something steady. Elsewhere mountains are <Tr>rawāsī</Tr>, “firmly set” or anchoring things (from <Tr>rasā</Tr>, a ship coming to anchor), placed so “that it may not tremble along with you” (<Tr>an tamīda bikum</Tr>, 16:15, 21:31, 31:10).
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <ul>
              <li>
                <strong>1850s:</strong> Surveyors in India found that the Himalaya pulled their plumb lines sideways <em>less</em> than the mountains’ visible mass should. In 1855 John Pratt and George Airy proposed explanations. Airy’s was that mountains are supported by light crustal “roots” extending deep into the denser mantle below, like icebergs floating in water.
              </li>
            </ul>
          ),
          more: (
            <ul>
              <li>
                This principle, <strong>isostasy</strong>, is now standard geology. Continental crust averages about 35–40 km thick, but beneath the Himalaya and the Tibetan Plateau it reaches roughly 70 km, measured by seismic waves.
              </li>
              <li>
                In the simple Airy model a mountain’s root is about <strong>5–6 times</strong> its height (see the calculator below).
              </li>
            </ul>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The image of a peg, mostly hidden below the surface, fits the discovery of mountain roots very well. That part is established science. The phrase “that it may not tremble along with you” is harder. Geologists do not say that mountains prevent earthquakes. Mountain belts are often seismically active, because they form where tectonic plates collide. Some writers link the verse to isostatic balance, which keeps the crust in gravitational equilibrium, or to mountains making the land stable for human life. Those are interpretations. Overall we grade this a <em>possible reading</em> with a well-established core.
            </p>
          ),
        },
      ],
    },
    {
      kind: "section",
      id: "how-deep-is-a-mountains-root",
      title: "How deep is a mountain’s root?",
      body: (
        <>
          <p>Airy isostasy: a mountain floats on the denser mantle like an iceberg in water. Adjust the height and the densities.</p>
          <IsostasyLab />
        </>
      ),
    },
    {
      kind: "topic",
      id: "barrier-between-seas",
      status: "interpretive",
      title: "“There is a barrier between them; that one cannot surpass the other”",
      lede: "Two bodies of water meet but keep their distinct character. Oceanographers find sharp boundaries between water masses, though some mixing always happens.",
      scripture: [{ verse: "55:19", to: "55:22" }, { verse: "25:53" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              God made “two oceans that appear to join”, with a <Tr>barzakh</Tr> (barrier, interval) between them so “that one cannot surpass the other” (<Tr>lā yabghiyān</Tr>). 25:53 specifies one “pleasantly fresh, very sweet” and the other “salty, very bitter”, with “a veil between them and a prohibited barrier”. Classical commentators often understood the barrier as the land or simply God’s power keeping them distinct.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <ul>
              <li>
                Water masses of different salinity and temperature have different densities, and they resist mixing. They meet along sharp boundaries (fronts, haloclines, pycnoclines) that can persist for long distances.
              </li>
              <li>
                At the Strait of Gibraltar, warm, salty Mediterranean water flows out <em>beneath</em> the incoming Atlantic water and spreads at around 1,000 m depth across the Atlantic. It stays recognisable thousands of kilometres away.
              </li>
            </ul>
          ),
          more: (
            <ul>
              <li>
                Where rivers meet the sea, estuaries form a brackish transition zone. Denser salt water often slides under the river water as a “salt wedge”, and each side keeps its own organisms.
              </li>
              <li>55:22 says “from them emerge pearl and coral stone”. Pearls do form in both salt-water oysters and freshwater mussels.</li>
            </ul>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              Distinct water masses with a transition zone between them is real oceanography. Popular videos showing “two seas that never mix” exaggerate. Water masses <em>do</em> mix gradually across their boundaries, and the barrier is a zone, not a wall. The verse’s own word, <Tr>barzakh</Tr>, means exactly an in-between zone. We grade it a <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "deep-sea-darkness",
      status: "interpretive",
      title: "Darknesses in a deep sea, waves above waves",
      lede: "A parable of spiritual darkness, drawn with physical detail that ocean science later confirmed.",
      scripture: [{ verse: "24:40" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              The verse is a <em>parable</em> for the deeds of those who reject faith. It describes darkness in a <Tr>baḥr lujjiyy</Tr>, a vast, fathomless sea, “covered by a wave, the wave covered by another wave, and above it is a cloud; layers of darkness are upon one another”, until a person cannot see their own hand.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <ul>
              <li>
                <strong>Layered darkness.</strong> Seawater absorbs light colour by colour. Red disappears within roughly the first 10 m and blue penetrates deepest. Even in clear ocean only about 1% of surface light remains at around 200 m, and below about 1,000 m there is no sunlight at all, only the glow of bioluminescent creatures.
              </li>
            </ul>
          ),
          more: (
            <ul>
              <li>
                <strong>Waves beneath the surface.</strong> The ocean is layered by density, and waves travel along the boundaries between layers: <em>internal waves</em>. Sailors’ reports of “dead water” were explained by Vagn Walfrid Ekman in 1904. Internal waves can be over 100 m high while barely visible on the surface.
              </li>
            </ul>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The imagery is vivid and accurate: darkness that deepens in layers, and a wave “covered by another wave”. Readers have linked the second wave to internal waves, which is a <em>possible reading</em>. The verse was revealed in a desert society, but the Arabs did travel by sea, and the verse is primarily a parable. We grade it accordingly.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "clouds-and-hail",
      status: "established",
      title: "Heaped clouds, and hail from “mountains” in the sky",
      scripture: [{ verse: "24:43" }, { verse: "30:48" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              God drives clouds, joins them together, then “piles them one over the other” (<Tr>rukām</Tr>), and rain emerges from within them. From “the sky wherein are mountains of ice” He sends down hail, and the flash of its lightning almost takes away eyesight. In 30:48 the winds raise clouds, spread them and break them into fragments, and rain emerges.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              This is a good description of a thunderstorm’s life cycle. Small cumulus clouds are carried by winds and merge. Strong updrafts stack them into a towering cumulonimbus, which can reach 12–15 km or more, a “mountain” of cloud. Hail forms only in such tall storms, where updrafts carry ice particles up and down through supercooled water until they grow heavy enough to fall. The same storms produce lightning.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The description is observationally accurate, and people in any age could see some of it. The link between hail and cloud “mountains” is the more striking detail. We grade it <em>consistent with established science</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "fertilising-winds",
      status: "established",
      title: "“We sent the winds that fill the clouds with water”",
      scripture: [{ verse: "15:22" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <Word ar="لَوَاقِحَ" tr="lawāqiḥ" /> means fertilising or impregnating. The translation shown gives the meaning “winds that fill the clouds with water”. Early commentators such as Ibn Masʿūd explained that the winds “fertilise” the clouds so they bear rain, and also fertilise the trees.
            </p>
          ),
          more: (
            <p>
              Both are true. Many plants, including grasses, cereals and the date palm, are pollinated by wind. The Arabs knew this well, and they also pollinated date palms by hand. Clouds need tiny airborne particles (aerosols: dust, sea salt, pollen) as “seeds” on which droplets condense, and winds carry these particles aloft. The verse then goes straight on: “We henceforth caused the water to come down from the sky”. <em>Consistent with established science.</em>
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "water-cycle",
      status: "established",
      title: "The water cycle",
      scripture: [{ verse: "39:21" }, { verse: "23:18" }, { verse: "56:68", to: "56:70" }],
      steps: [
        {
          heading: "What the texts say",
          gist: (
            <p>
              God sent water down from the sky “in a measured amount”, then “stored it in the earth”, and from it He “made springs” (<Tr>yanābīʿ</Tr>) that water crops. Drinking water is fresh, though “if We will, so We can make it salty” (56:70).
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              The Sun evaporates ocean water, leaving the salt behind, so rain is fresh although the sea is salty. Some rain soaks into the ground as groundwater and returns to the surface through springs and rivers. Ancient thinkers had partial ideas about this cycle. It was not established quantitatively until Pierre Perrault (1674) and Edmond Halley (1687) showed that rainfall and evaporation are enough to supply the rivers. Before that, many believed springs were fed by seawater flowing through underground channels.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              Clear and accurate: rain feeds groundwater, and groundwater feeds springs. We grade it <em>consistent with established science</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "protected-roof",
      status: "interpretive",
      title: "“A protected roof”",
      scripture: [{ verse: "21:32" }, { verse: "86:11", to: "86:12" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              The sky is a <Tr>saqf maḥfūẓ</Tr>, a protected (or protecting) roof. 86:11 swears by the sky <Tr>dhāt al-rajʿ</Tr>, literally “of the return”, which the translation shown and the classical scholars explain as the sky “from which comes down the rain”, again and again. 86:12 swears by the earth “which opens up by it” for plants.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <ul>
              <li>
                The <strong>ozone layer</strong> absorbs most of the Sun’s harmful ultraviolet radiation.
              </li>
              <li>Meteoroids burn up in the atmosphere. Many tonnes of cosmic dust and debris enter every day, mostly harmlessly.</li>
            </ul>
          ),
          more: (
            <ul>
              <li>
                Earth’s <strong>magnetic field</strong> deflects most of the solar wind and cosmic rays.
              </li>
              <li>
                The atmosphere also “returns” things. Water returns as rain, heat radiated by the ground is partly returned by greenhouse gases (keeping Earth habitable), and the ionosphere reflects certain radio waves back to the ground.
              </li>
            </ul>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The Qur’an’s wording is general, and classical readings focused on the sky being guarded and preserved: “We have kept it guarded from every accursed devil” (15:17). The atmosphere’s protective roles are a natural and beautiful <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "climbing-into-the-sky",
      status: "interpretive",
      title: "“As if he was being forced by someone to climb the sky”",
      scripture: [{ verse: "6:125" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              The verse compares the chest of someone who rejects guidance, made “narrow and extremely constrained”, to a person “being forced by someone to climb the sky”. It is a spiritual image.
            </p>
          ),
          more: (
            <p>
              Its physical side is accurate. Air pressure halves by about 5,500 m, and at the summit of Everest it is only about one-third of sea level. Climbers and pilots at altitude suffer shortness of breath and chest tightness from lack of oxygen (hypoxia). No one in seventh-century Arabia had experienced high altitude in that way, although mountain dwellers knew thin air. We grade it a <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "colours-of-mountains",
      status: "established",
      title: "White, red and pitch-black tracks in the mountains",
      scripture: [{ verse: "35:27" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              The verse describes mountains with <Tr>judad</Tr>, “tracks; white and red of different colours, and some (mountains are) pitch-black”. That is a precise description of layered rock. Iron oxides stain rock red. Limestone, quartz and gypsum are pale. Volcanic basalt is black. Every layer records a different chapter of Earth’s history, which is what geologists read. The next verse (35:28) says that among God’s servants, those with knowledge truly fear Him. <em>Consistent with established science.</em>
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "lowest-land",
      status: "debated",
      title: "“In the nearby land”: the Romans and a prophecy",
      scripture: [{ verse: "30:2", to: "30:4" }],
      steps: [
        {
          heading: "The prophecy",
          gist: (
            <p>
              Around 614–615 CE the Byzantine (Roman) empire had suffered crushing defeats by Persia, including the loss of Jerusalem. The Qur’an announced that the Romans would be dominant “within a few years” (<Tr>fī biḍʿi sinīn</Tr>, a phrase meaning three to nine). The Byzantine emperor Heraclius launched his counter-offensive in 622 and decisively defeated the Persians near Nineveh in 627. This is a matter of history.
            </p>
          ),
        },
        {
          heading: "The word adnā",
          gist: (
            <p>
              <Word ar="أَدْنَى ٱلْأَرْضِ" tr="adnā al-arḍ" /> most naturally means “the <em>nearby</em> land”, nearest to Arabia. That is how classical commentators read it, and how the translation shown renders it. <Tr>Adnā</Tr> can also mean “lowest”, and the region around Jerusalem includes the shores of the Dead Sea, the lowest land surface on Earth at about 430 m below sea level and still falling. Some modern writers highlight this second meaning. The exact site of the battle meant is itself discussed, so we present this as <em>debated</em>. The prophecy, on the other hand, is a documented fulfilment.
            </p>
          ),
        },
      ],
    },
  ],
} satisfies Page;
