import type { Page } from "../define";
import { Card, Cards, Split, Tr, Word } from "@/components/content/Text";
import { PageLink } from "@/components/content/PageLink";
import { Hadith } from "@/components/scripture/Hadith";
import { Grade } from "@/components/evidence/Grade";

export default {
  slug: "life",
  title: "Life, Health & Medicine",
  navTitle: "Life, Health & Medicine",
  description:
    "Life from water, the female worker bee and healing honey, milk from between digested food and blood, the “lying sinful” forelock, plants in pairs, and the Prophet’s teaching on cures, hygiene and quarantine. Biology and medicine beside the Qur’an and Hadith.",
  hook: "Life from water, the female worker bee, honey, milk, the forelock, quarantine and the duty to seek cures.",
  part: "selves",
  scale: -2,
  scene: "hive",
  flow: [
    {
      kind: "topic",
      id: "life-from-water",
      status: "established",
      title: "“We made every living thing from water”",
      scripture: [{ verse: "21:30" }, { verse: "24:45" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              Every living thing is made “from water”. 24:45 applies this to every (living) creature, whether it walks upon its belly, upon two legs or upon four.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <ul>
              <li>Water makes up about 70% of the mass of a typical cell and about 60% of an adult human body.</li>
              <li>All known life depends on liquid water as the medium for its chemistry: dissolving nutrients, carrying signals, folding proteins.</li>
            </ul>
          ),
          more: (
            <ul>
              <li>Most scientists think life on Earth began in water. The search for life elsewhere is guided by the rule “follow the water”.</li>
            </ul>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The plain meaning is correct. Ancient thinkers such as Thales had also regarded water as fundamental, so the idea was not unheard of, but the Qur’an
              states it clearly and universally for all living things. <em>Consistent with established science.</em>
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "bees-and-honey",
      status: "established",
      title: "The bee, her paths, and honey “in which is healing for the people”",
      scripture: [{ verse: "16:68", to: "16:69" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              God “inspired the bee” to make homes, eat from all kinds of fruits, and “walk the ways of your Lord which are soft and easy for you” (
              <Tr>subul rabbiki dhululā</Tr>). “From their bellies comes a drink of various colours in which is healing for the people”. All the verbs addressed to the
              bee are grammatically <em>feminine</em>: <Tr>ittakhidhī</Tr>, <Tr>kulī</Tr>, <Tr>fa-slukī</Tr>.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <ul>
              <li>
                <strong>The workers are female.</strong> The bees that build comb, forage for nectar and make honey are all females. Male drones do none of this.
              </li>
              <li>
                <strong>Paths.</strong> Foragers navigate by the Sun and by landmarks, and tell their sisters the direction and distance of flowers with the “waggle
                dance”, decoded by Karl von Frisch (Nobel Prize, 1973).
              </li>
            </ul>
          ),
          more: (
            <ul>
              <li>
                <strong>From their bellies.</strong> Nectar is carried in the bee’s honey stomach, processed with enzymes, and then regurgitated and evaporated into
                honey.
              </li>
              <li>
                <strong>Varying colours.</strong> Honey ranges from almost clear to dark brown depending on the flowers.
              </li>
              <li>
                <strong>Healing.</strong> Honey is antibacterial because of its high sugar concentration, its acidity and the hydrogen peroxide it produces. Some
                honeys, such as manuka, have additional active compounds. Medical-grade honey dressings are approved and used for wounds and burns.
              </li>
            </ul>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The description is accurate throughout. One honest caveat: in Arabic the collective noun <Tr>naḥl</Tr> (bees) is grammatically feminine anyway, so the
              feminine verbs may be simple grammar. It remains a happy fit. The verse says “<em>in which</em> is healing”, not that honey cures everything. We grade it{" "}
              <em>consistent with established science</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "milk",
      status: "established",
      title: "“Pure milk from between dung and blood”",
      scripture: [{ verse: "16:66" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              The verse says God gives us to drink from what is in the bellies of cattle: “pure milk from between dung and blood, which is soothing to swallow for the
              drinkers”. The word translated “dung” is <Tr>farth</Tr>, the digested contents of the gut.
            </p>
          ),
          more: (
            <p>
              That is the physiology of lactation in one line. Digested food in the gut is absorbed into the bloodstream, and the blood carries nutrients to the
              mammary glands. There, specialised cells build milk: its fats, proteins and sugar, lactose. A great deal of blood must flow through a cow’s udder,
              commonly estimated at several hundred litres, to produce a single litre of milk. The milk is clean and nourishing despite coming from between waste and
              blood. <em>Consistent with established science.</em>
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "forelock",
      status: "interpretive",
      title: "“What kind of forelock! A lying sinful one”",
      scripture: [{ verse: "96:15", to: "96:16" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="نَاصِيَة" tr="nāṣiyah" /> is the forelock, the hair and front of the head. To seize someone by the forelock was an Arabic idiom for having
              complete control over them and humbling them (compare 11:56, “there is no one that walks whose forelock is not in His Grip of power”). Here the{" "}
              <em>forelock itself</em> is called “a lying sinful one”.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              Directly behind the forehead lies the <strong>prefrontal cortex</strong>, the part of the brain most involved in planning, decision-making, self-control
              and moral judgement. Brain-imaging studies of deliberate lying consistently show heightened activity in prefrontal regions.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              It is striking that the verse attributes lying and sin to the front of the head, where the brain’s decision-making centre is. The classical meaning is
              idiomatic, and brain function is distributed, so we grade it a <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "skin-and-pain",
      status: "interpretive",
      title: "Skin and the sensation of pain",
      scripture: [{ verse: "4:56" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              Describing the punishment of the Hereafter, the verse says that whenever skins are burnt through they are changed “for new skins; that they may
              (endlessly) taste the punishment”, linking the <em>skin</em> to the experience of pain.
            </p>
          ),
          more: (
            <p>
              Many pain receptors (nociceptors) lie in the skin. Severe, full-thickness burns destroy those nerve endings, which is why the centre of such a burn can be
              numb even though the injury is grave. The verse concerns the unseen world, but its link between intact skin and the ability to feel is physiologically
              sound. We grade it a <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "plants-in-pairs",
      status: "established",
      title: "Plants in pairs",
      scripture: [{ verse: "13:3" }, { verse: "20:53" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              The Qur’an says God “made in the earth all kinds of fruits in pairs” and sent down rain to bring forth “various pairs of vegetation”. The Arabs knew the
              date palm has male and female trees, and they pollinated it by hand. The general fact that plants reproduce sexually, with male stamens producing pollen
              and female pistils bearing ovules that become seeds and fruit, was demonstrated experimentally in Europe by Rudolf Camerarius in 1694. Many flowers hold
              both sexes in a single blossom, and some species have separate male and female plants. <em>Consistent with established science.</em>
            </p>
          ),
        },
      ],
    },
    {
      kind: "section",
      id: "more-signs-in-living-things",
      title: "More signs in living things",
      body: (
        <Cards>
          <Card title="“Nations like you” (6:38)" meta={<Grade status="established" />}>
            <p>
              Every creature on the earth and every bird that flies on its wings forms <Tr>umam</Tr>, “nations like you”. Ethology finds rich social life across the
              animal world: division of labour in insect colonies, cooperation and mourning in elephants, signature whistles, a kind of name, in dolphins.
            </p>
          </Card>
          <Card title="The ant’s warning (27:18)" meta={<Grade status="interpretive" />}>
            <p>
              An ant exclaims, “O ants, enter your homes”. Real ants raise the alarm with chemical signals (alarm pheromones), and some species also communicate by
              sound. Sulaymān’s understanding of her speech is a miracle, belonging to the unseen.
            </p>
          </Card>
          <Card title="Held aloft (67:19)" meta="Reflection">
            <p>
              Birds spread and fold their wings, and “no one except the Most Gracious holds them up”. Aerodynamics explains the mechanism, lift from moving air over
              shaped wings. For believers the mechanism is the means by which God holds them. See{" "}
              <PageLink to="knowledge" hash="causes-and-the-one-behind-them">
                causes and the One behind them
              </PageLink>
              .
            </p>
          </Card>
          <Card title="What the fly takes (22:73)" meta={<Grade status="interpretive" />}>
            <p>
              “If a fly snatches away something from them, they cannot even recover that from it.” Many flies digest food <em>outside</em> their bodies, pouring saliva
              onto it and sucking it up already chemically changed. The verse’s point is the helplessness of idols, and the biological detail is a{" "}
              <em>possible reading</em>.
            </p>
          </Card>
        </Cards>
      ),
    },
    {
      kind: "section",
      id: "medicine-for-every-disease-there-is-a-cure",
      title: "Medicine: “For every disease there is a cure”",
      body: (
        <Split>
          <div>
            <p>
              Two authentic hadith state that God has not created any disease without also creating its cure, and that when the right remedy meets the disease, it
              heals by God’s permission. Muslim physicians took this as a mandate to search for cures. It helped drive centuries of medical research, from al-Rāzī’s
              clinical observations to Ibn Sīnā’s <em>Canon of Medicine</em>. See <PageLink to="scholars">Muslim Scientists</PageLink>.
            </p>
            <p>The same outlook sits behind the hadith “tie your camel”. Seeking treatment is part of trusting God, not opposed to it.</p>
            <h3>Quarantine, fourteen centuries ago</h3>
            <p>
              The Prophet ﷺ told people not to enter a land where plague has broken out, and not to flee from one where they already are. That is the core of modern
              outbreak control: stop the disease being carried into new areas and keep exposed people from spreading it. During the COVID-19 pandemic this hadith was
              widely quoted, by Muslims and non-Muslims alike, as early public-health wisdom.
            </p>
            <h3>Hygiene and moderation</h3>
            <p>
              Islamic practice builds hygiene into daily life. Ritual washing before each prayer, cleaning the teeth with the <Tr>siwāk</Tr>, and cleanliness as “half
              of faith” all fit well with modern understanding of infection. The Qur’an says “eat and drink, and do not cross the limit” (7:31), and the Prophet ﷺ
              advised filling the stomach no more than a third with food.
            </p>
            <h3>Black seed: a note of care</h3>
            <p>
              An authentic hadith says there is healing in black seed (<Tr>Nigella sativa</Tr>) “for every disease except death”. Classical scholars discussed whether
              “every disease” is a general expression with a more specific intended meaning. Modern laboratory and clinical studies of its compounds, especially
              thymoquinone, report some promising results, but most are small or early-stage. Faithful use of the hadith does not mean replacing proven medical
              treatment.
            </p>
          </div>
          <aside className="space-y-8">
            <Hadith k="bukhari:5678" />
            <Hadith k="muslim:2204" />
            <Hadith k="bukhari:5728" />
            <Hadith k="muslim:223" />
            <Hadith k="bukhari:887" />
            <Hadith k="tirmidhi:2380" />
            <Hadith k="bukhari:5688" />
          </aside>
        </Split>
      ),
    },
  ],
} satisfies Page;
