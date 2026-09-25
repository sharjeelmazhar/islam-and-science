import type { Page } from "../define";
import { Callout, Split, Tr } from "@/components/content/Text";
import { Verse } from "@/components/scripture/Verse";
import { Stages } from "@/components/content/pages/embryology/Stages";

export default {
  slug: "embryology",
  title: "Human Creation",
  navTitle: "Human Creation",
  description:
    "Nuṭfah, ʿalaqah, muḍghah, bones clothed with flesh. The Qur’an’s stages of human creation and the hadith of forty and forty-two days, set carefully beside modern embryology, including where the correspondences are strong and where they are debated.",
  hook: "Nuṭfah, ʿalaqah, muḍghah: the stages of the embryo, how sex is determined, and what the hadith add.",
  part: "selves",
  scale: -3,
  scene: "embryo",
  flow: [
    {
      kind: "section",
      id: "a-note-before-we-begin",
      title: "A note before we begin",
      body: (
        <p>
          Embryology is where some of the most-quoted “scientific miracle” claims are made, and also where some of the most careless ones are. We quote the verses
          exactly, give the modern timeline in weeks after fertilisation (standard in embryology textbooks), and grade each point on its own merits.
        </p>
      ),
    },
    {
      kind: "section",
      id: "the-stages-in-the-quran",
      title: "The stages in the Qur’an",
      body: (
        <>
          <Split>
            <div className="space-y-10">
              <Verse at="23:12" to="23:14" />
              <Verse at="71:14" />
            </div>
            <p>
              Qur’an 23:12–14 gives the fullest sequence, and 71:14 sums it up: “He has created you in stages” (<Tr>aṭwārā</Tr>). The Arabic terms are descriptive.
              They name what each stage <em>looks like</em> or <em>does</em>, not technical categories.
            </p>
          </Split>
          <Stages
            items={[
              {
                ar: "نُطْفَة",
                tr: "nuṭfah",
                when: "Fertilisation → week 1",
                text: (
                  <p>
                    “A drop of fluid”, placed “in a strong resting place” (<Tr>qarār makīn</Tr>, the womb). The fertilised egg divides and implants in the uterine wall
                    around days 6–10.
                  </p>
                ),
              },
              {
                ar: "عَلَقَة",
                tr: "ʿalaqah",
                when: "≈ weeks 3–4",
                text: (
                  <p>
                    “Something that clings”, “a leech”, or “a clot of blood”. The embryo, 2–4 mm long, hangs attached to the womb and resembles a leech in shape. Its
                    heart starts beating around day 22.
                  </p>
                ),
              },
              {
                ar: "مُضْغَة",
                tr: "muḍghah",
                when: "≈ weeks 4–5",
                text: (
                  <p>
                    “A chewed lump”. Paired blocks of tissue called somites appear along the back, looking like tooth marks. The embryo is part-formed and part-unformed
                    (22:5).
                  </p>
                ),
              },
              {
                ar: "عِظَام",
                tr: "ʿiẓām",
                when: "≈ weeks 6–7",
                text: (
                  <p>
                    “Bones”. The skeleton is laid down, first as cartilage models of the bones, which begin to ossify from about week 7. The clavicle starts even
                    earlier.
                  </p>
                ),
              },
              {
                ar: "لَحْم",
                tr: "laḥm",
                when: "≈ weeks 7–8",
                text: (
                  <p>
                    “Flesh”. Muscles organise around the skeletal framework and attach to it. By the end of week 8 the embryo has a clearly human form.
                  </p>
                ),
              },
              {
                ar: "خَلْقًا آخَر",
                tr: "khalqan ākhar",
                when: "Week 9 → birth",
                text: (
                  <p>
                    “Another form”, literally another creation. The foetal period: growth, maturation of organs, and in the hadith, the soul.
                  </p>
                ),
              },
            ]}
          />
        </>
      ),
    },
    {
      kind: "topic",
      id: "alaqah",
      status: "interpretive",
      title: "ʿAlaqah: the thing that clings",
      scripture: [{ verse: "96:1", to: "96:2" }, { verse: "22:5" }],
      steps: [
        {
          heading: "What the word says",
          gist: (
            <p>
              The root <Tr>ʿ-l-q</Tr> means to cling, hang or be attached. <Tr>ʿAlaqah</Tr> was used for a leech, which clings and feeds on blood, and for a clot of
              thick blood. Classical commentators, working without microscopes, usually explained it as a blood clot.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              At about three to four weeks the embryo is implanted in, and hanging from, the wall of the womb. It draws nourishment from the mother’s blood. Its
              outline, with a curved body and bulging segments, closely resembles a leech. Its heart and blood vessels are forming and already contain blood, so it has
              a notably blood-rich appearance.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              All three meanings, clinging, leech-like and blood-rich, describe real features of this stage, and a single word captures them. We grade it a{" "}
              <em>possible reading</em>, one of the more impressive ones.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "bones-then-flesh",
      status: "debated",
      title: "“…then clothed the bones with flesh”",
      scripture: [{ verse: "23:14" }],
      aside: (
        <Callout title="About Keith Moore">
          <p>
            Canadian anatomist Keith L. Moore, author of the standard textbook <em>The Developing Human</em>, produced a special 1982/83 edition “with Islamic
            additions”, prepared with the Yemeni scholar ʿAbd al-Majīd al-Zindānī, which set Qur’an and hadith beside embryology. It is widely cited. In 2002 Moore
            declined to discuss the subject with the <em>Wall Street Journal</em>, saying it had been “ten or eleven years” since he was involved. We cite the
            embryology itself, not endorsements.
          </p>
        </Callout>
      ),
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              The verse orders the stages with <Tr>fa-</Tr> (“and then, promptly”): the <Tr>muḍghah</Tr> is made into bones, <em>then</em> the bones are clothed (
              <Tr>kasawnā</Tr>) with flesh.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              Both the skeleton and the muscles come from the same embryonic layer, the mesoderm, and they develop largely in parallel from about week 5. The skeleton
              is first laid down as cartilage models. Muscle cells then organise around these models and attach to them, so that by weeks 7–8 the muscles “wrap” the
              skeletal framework. Some embryologists describe this as bone-first-then-muscle. Others stress that the precursor tissues appear at about the same time.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The image of a skeletal framework being “clothed” by muscle fits how the body takes shape in the late embryonic period. Whether the order is strictly
              sequential depends on which stage of tissue you count. We mark this <em>debated</em> so that no one overstates it. It is also fair to note that Greek
              physicians, especially Galen (2nd century), had described development in stages. The idea of stages itself was not unknown, and what is distinctive is
              the Qur’an’s choice of vivid, accurate descriptive terms.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "three-darknesses",
      status: "established",
      title: "“In darkness threefold”",
      scripture: [{ verse: "39:6" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              Early commentators, including Ibn ʿAbbās, Mujāhid and Qatādah, explained the three darknesses as <strong>the belly, the womb, and the membrane</strong>{" "}
              surrounding the child (<Tr>al-mashīmah</Tr>). The translation shown glosses them as “the stomach, womb and uterus”.
            </p>
          ),
          more: (
            <p>
              Anatomy agrees. The developing child lies within the <strong>abdominal wall</strong>, the <strong>wall of the uterus</strong>, and the{" "}
              <strong>amniotic and chorionic membranes</strong>, three layers that shut out light. The classical explanation and the modern description are the same,
              so we grade it <em>consistent with established science</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "mixed-drop",
      status: "established",
      title: "A “mixed” drop, and male and female from the man’s drop",
      scripture: [{ verse: "76:2" }, { verse: "53:45", to: "53:46" }],
      steps: [
        {
          heading: "A mixture",
          gist: (
            <p>
              <Tr>Nuṭfatin amshāj</Tr> means a drop of mingled elements. A new human begins when the father’s sperm and the mother’s egg combine, each contributing 23
              chromosomes. Fertilisation was first observed directly by Oscar Hertwig in 1876, in sea urchins. Earlier theories often held that only one parent really
              contributed the offspring’s form.
            </p>
          ),
        },
        {
          heading: "Sex from the emitted drop",
          gist: (
            <p>
              53:45–46 says God created the two kinds, male and female, “from a semen-drop when it is emitted (into the womb)” (<Tr>idhā tumnā</Tr>, see also
              75:37–39). Biology agrees that the sex of the child is set by the father’s contribution. Every egg carries an X chromosome, while each sperm carries
              either an X or a Y. Nettie Stevens discovered chromosomal sex determination in 1905, and the SRY gene on the Y chromosome that triggers male development
              was identified in 1990.
            </p>
          ),
          more: (
            <p>
              These are the plain meanings of the verses, and they are correct. The hadith of Ḥudhayfah also has the angel ask “male or female?” after the 42nd
              night. At that point the sex has already been set genetically at fertilisation, but the testes or ovaries have only just begun to develop.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "backbone-and-ribs",
      status: "debated",
      title: "“Which comes out from between the backs and the chests”",
      scripture: [{ verse: "86:5", to: "86:7" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              The human is created “from a spurting (drop of) fluid”, which “comes out from between the backs and the chests”: the <Tr>ṣulb</Tr> (backbone, loins)
              and the <Tr>tarāʾib</Tr> (ribs, chest bones). Classical commentators offered several readings: the man’s loins and the woman’s chest, or the loins and
              chest of the man alone.
            </p>
          ),
        },
        {
          heading: "Proposed modern readings",
          gist: (
            <p>
              The testes and ovaries originate in the embryo high in the abdomen, near the developing kidneys between the spine and the lower ribs, and descend later.
              Their blood supply and nerves still come from that region in the adult. Some writers see the verse as pointing to this origin.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              This is genuinely <em>debated</em>. The verse’s subject is the fluid, and the embryological reading requires linking it to the origin of the organs that
              produce it. Critics find that strained. We present it without claiming it as a miracle.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "fingertips",
      status: "interpretive",
      title: "“We are (even) able to make all his finger joints (again)”",
      scripture: [{ verse: "75:3", to: "75:4" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              Answering doubt about the Resurrection, God says He is able to reconstruct not just bones but even the <Tr>banān</Tr>, the fingers down to their tips,
              “in a perfect order”. The translation shown renders it “all his finger joints”. Other translators render it “fingertips”.
            </p>
          ),
          more: (
            <p>
              Fingertips carry ridge patterns, fingerprints, that are unique to each person, and even identical twins differ. The ridges form in the womb between
              roughly the 10th and 16th weeks and stay the same for life. Their uniqueness was established scientifically by Francis Galton (<em>Finger Prints</em>,
              1892), and Scotland Yard adopted fingerprint identification in 1901. Choosing the fingers as the example of precise re-creation is striking, and the
              fingerprint connection depends on the rendering “fingertips”. The verse does not mention prints, so we grade it a <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "hearing-and-sight",
      status: "interpretive",
      title: "Hearing, then sight",
      scripture: [{ verse: "32:9" }, { verse: "16:78" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              When the Qur’an lists human faculties it very often names hearing (<Tr>al-samʿ</Tr>) before sight (<Tr>al-abṣār</Tr>), and the hadith of Ḥudhayfah
              lists them in the same order. In development, the ear’s structures mature earlier, and a foetus responds to sound from around the 24th week of
              pregnancy. The eyelids stay fused until about the 26th week, and useful vision develops mostly after birth.
            </p>
          ),
          more: (
            <p>
              The order may simply be rhetorical, since hearing is also the faculty by which revelation is received, so we grade this a <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "forty-days",
      status: "unseen",
      title: "The hadith of forty days, and of forty-two nights",
      scripture: [{ hadith: "bukhari:3208" }, { hadith: "muslim:2645" }],
      steps: [
        {
          heading: "Two authentic hadith",
          gist: (
            <p>
              Both are in the most authoritative collections. The first, from Ibn Masʿūd, speaks of gathering “in forty days”, then <Tr>ʿalaqah</Tr> “likewise”, then{" "}
              <Tr>muḍghah</Tr> “likewise”, then the angel. Many classical scholars read this as three successive forty-day periods, with the soul breathed in after 120
              days. The second, from Ḥudhayfah ibn Asīd, says that after <strong>forty-two nights</strong> the angel is sent to shape the embryo and create its
              hearing, sight, skin, flesh and bones.
            </p>
          ),
        },
        {
          heading: "How scholars reconcile them",
          gist: (
            <p>
              Classical scholars, including al-Nawawī in his commentary on <Tr>Ṣaḥīḥ Muslim</Tr>, discussed how the two relate. They noted that different angelic
              tasks may occur at different times. Some contemporary scholars read “likewise” (<Tr>mithla dhālika</Tr>) as describing the stages happening within the{" "}
              <em>same</em> forty-day span, which fits the modern timeline well. This is a matter of legitimate scholarly discussion.
            </p>
          ),
        },
        {
          heading: "What embryology shows at six weeks",
          gist: (
            <p>
              Forty-two days after fertilisation the embryo is only about a centimetre long. Yet it has limb buds with the first outlines of fingers, eyes, the
              beginnings of the outer ears, a beating heart, and a skeleton starting to form in cartilage. This is the window in which it takes on a recognisably human
              form, which is striking beside the hadith of Ḥudhayfah.
            </p>
          ),
          more: (
            <p>
              The angel, the writing of destiny and the breathing of the soul belong to the <em>unseen</em>, and embryology has nothing to say about them.
            </p>
          ),
        },
      ],
    },
  ],
} satisfies Page;
