import type { Page } from "../define";
import { Ar, Table, Tr, Word } from "@/components/content/Text";
import { PageLink } from "@/components/content/PageLink";
import { LightLab } from "@/labs/ui";

export default {
  slug: "deep-space",
  title: "Stars & Deep Space",
  navTitle: "Stars & Deep Space",
  description:
    "The places where the stars set, the brightly shining night-visitor, the stars that recede and sweep, Sirius, iron from the heavens and passing beyond the regions of the sky. Astrophysics beside the Qur’an, including what we cannot claim.",
  hook: "The places where the stars set, the brightly shining star, iron from the heavens, Sirius, and the life and death of suns.",
  part: "horizons",
  scale: 21,
  scene: "galaxy",
  flow: [
    {
      kind: "topic",
      id: "positions-of-the-stars",
      status: "interpretive",
      title: "“I swear an oath by the places where the stars set”",
      lede: "An oath the Qur’an calls great: “if you understand, so it is a great oath”. Modern astronomy offers one striking way to see why.",
      scripture: [{ verse: "56:75", to: "56:76" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="مَوَٰقِعِ ٱلنُّجُومِ" tr="mawāqiʿ al-nujūm" /> means the places where the stars fall, set or stand. Classical commentators gave several meanings: the stars’ setting points on the horizon (the meaning the translation shown follows), their positions in the sky, or, in a view reported from Ibn ʿAbbās, the <em>installments</em> (<Tr>nujūm</Tr>) in which the Qur’an itself was revealed, since the next verse speaks of the Qur’an.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              Light has a finite speed, 299,792 km/s. So we never see a star where it is <em>now</em>. We see it where it was, and as it was, when the light set out. For the nearest star beyond the Sun that is 4.2 years ago. For most naked-eye stars it is decades to centuries, and for distant galaxies it is millions to billions of years. Stars also move: each has a measurable “proper motion” across the sky. The positions of the stars are a record of cosmic history, spread over unimaginable distances.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The oath’s emphasis, “if you understand”, fits the scale that modern astronomy reveals remarkably well. The verse does not describe light travel time, and early scholars read it in other ways. We grade it a <em>possible reading</em>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "section",
      id: "how-long-has-the-light-been-travelling",
      title: "How long has the light been travelling?",
      body: (
        <>
          <h3>Light travel time</h3>
          <p>Choose an object. The number shows how long its light took to reach you, which is how far into the past you are looking.</p>
          <LightLab />
        </>
      ),
    },
    {
      kind: "topic",
      id: "the-piercing-star",
      status: "interpretive",
      title: "“The one that comes at night… the very brightly shining star”",
      lede: "Sūrat al-Ṭāriq opens with an oath by a mysterious visitor of the night, then identifies it as “the very brightly shining star”.",
      scripture: [{ verse: "86:1", to: "86:3" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="ٱلطَّارِق" tr="al-ṭāriq" /> is literally “the one who knocks”, from <Tr>ṭaraqa</Tr>, to strike or knock. It was used for anyone who arrives at night, since a night visitor must knock. <Word ar="ٱلثَّاقِب" tr="al-thāqib" /> means piercing or penetrating. Classical scholars understood it as a brilliant star whose light pierces the darkness. Some named a particular star, while others took it to mean bright stars in general.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              In 1967 Jocelyn Bell Burnell and Antony Hewish discovered <em>pulsars</em>: collapsed stars (neutron stars) the size of a city that spin up to hundreds of times a second and sweep beams of radio waves past Earth. Radio telescopes pick them up as sharp, regular pulses, like knocking. Some modern writers therefore link <Tr>al-ṭāriq</Tr> to pulsars.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The link is imaginative, but it is speculative. “Night-comer” is ordinary Arabic for any nocturnal visitor, and the classical meaning of a brilliant star fits the passage completely. We list it as a <em>possible reading</em> only.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "black-holes",
      status: "interpretive",
      title: "“Those (stars) that retreat… move straight, (then) stop moving”: planets, or black holes?",
      lede: "A pair of verses often quoted in connection with black holes. Their classical reading is a precise piece of naked-eye astronomy.",
      scripture: [{ verse: "81:15", to: "81:16" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Tr>Al-khunnas</Tr> are things that draw back or recede. <Tr>Al-jawārī</Tr> are things that run. <Tr>Al-kunnas</Tr> are things that sweep or disappear into their dens, a word used for gazelles entering their lairs. Many classical commentators identified these with the planets, which periodically appear to <em>move backward</em> against the stars (retrograde motion), run their courses, and then vanish into the Sun’s glare. Others took them to be stars that disappear by day. The translation shown makes the classical reading explicit: “(stars) that retreat… move straight, (then) stop moving”.
            </p>
          ),
          more: (
            <p>
              You can watch planets “drawing back” in the <PageLink to="earths-motion">Earth-centred view of the 3D model</PageLink>. Mars and Venus trace exactly these backward loops.
            </p>
          ),
        },
        {
          heading: "What science says about black holes",
          gist: (
            <ul>
              <li>
                <strong>1916:</strong> Karl Schwarzschild found the first black-hole solution of Einstein’s equations.
              </li>
              <li>
                <strong>1971–72:</strong> Cygnus X-1 became the first strong black-hole candidate.
              </li>
            </ul>
          ),
          more: (
            <ul>
              <li>
                <strong>2015:</strong> LIGO detected gravitational waves from two merging black holes, announced in 2016.
              </li>
              <li>
                <strong>2019 and 2022:</strong> The Event Horizon Telescope imaged the shadows of the black holes in the galaxy M87 and at the centre of our own galaxy (Sagittarius A*, about 4 million solar masses).
              </li>
              <li>
                <strong>2020:</strong> Nobel Prize to Penrose, Genzel and Ghez for black-hole research.
              </li>
            </ul>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              Black holes neither “recede” nor “run” in any special way, and the retrograde-planet reading fits all three words precisely. We think the black-hole interpretation is weak and we do not rely on it. The classical reading is already a beautiful description of planetary motion.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "lamps",
      status: "established",
      title: "“We have indeed adorned the lower heaven with lamps”",
      scripture: [{ verse: "67:5" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              The stars are called <Tr>maṣābīḥ</Tr>, lamps. Like the Sun, which the Qur’an also calls a lamp, the stars generate their own light. Every star is a sun, powered by nuclear fusion in its core. Some are thousands of times brighter than ours. The verse also mentions stars made as “weapons against the devils”, which concerns the unseen and is explained in the hadith. Science neither confirms nor denies it.
            </p>
          ),
          more: (
            <p>
              Nineteenth-century spectroscopy showed that stars are made of the same elements as the Earth and the Sun. That the lights of the night sky are distant suns is now a basic fact of astronomy.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "sirius",
      status: "established",
      title: "“Only He is the Lord of the star named Shi’ra (Sirius)”",
      lede: "The only star the Qur’an names individually.",
      scripture: [{ verse: "53:49" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              <Word ar="ٱلشِّعْرَىٰ" tr="al-shiʿrā" /> is Sirius, the brightest star in the night sky. Commentators explain that some pre-Islamic Arabs worshipped it. The verse makes the point that it is created and ruled like everything else.
            </p>
          ),
          more: (
            <>
              <dl className="my-4 grid gap-x-6 gap-y-2 border-t border-rule pt-3 sm:grid-cols-[9rem_1fr]">
                <dt className="font-mono text-sm text-gold">Distance</dt>
                <dd>8.6 light-years, one of our nearest neighbours</dd>
                <dt className="font-mono text-sm text-gold">Brightness</dt>
                <dd>About 25 times as luminous as the Sun</dd>
                <dt className="font-mono text-sm text-gold">A double star</dt>
                <dd>
                  Sirius has a faint companion, Sirius B, a white dwarf: the collapsed core of a dead star. Friedrich Bessel inferred it in 1844 from Sirius’s wobble, and Alvan Clark first saw it in 1862.
                </dd>
              </dl>
              <p>There is no scientific claim here, only a reminder. The most dazzling object in the night sky has a Lord.</p>
            </>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "iron",
      status: "interpretive",
      title: "“And We sent down iron”",
      lede: "A verse often linked to the stellar origin of iron. The science is true and wonderful. The link needs care.",
      scripture: [{ verse: "57:25" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              <Word ar="وَأَنزَلْنَا ٱلْحَدِيدَ" tr="wa-anzalnā al-ḥadīd" />: “We sent down iron, in which there is extreme strength and benefits for people”. The same verb <Tr>anzala</Tr> is also used for God providing livestock (39:6) and clothing (7:26), in the sense of a gift “sent down” from Him. So “sent down” need not mean physically falling from the sky.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <ul>
              <li>
                Iron was not made on Earth. Nuclear fusion inside stars builds heavier elements step by step, up to iron. Fusing iron consumes energy instead of releasing it, so iron builds up in the cores of massive stars just before they collapse and explode as supernovae. Those explosions scattered iron through space. (Stellar nucleosynthesis was worked out in the classic 1957 paper by Burbidge, Burbidge, Fowler and Hoyle.)
              </li>
            </ul>
          ),
          more: (
            <ul>
              <li>
                The Earth formed from a cloud of gas and dust already enriched with that iron. Iron makes up roughly a third of Earth’s mass, most of it in the core, where it generates the magnetic field that shields life from the solar wind.
              </li>
              <li>
                Iron meteorites still fall today, and the earliest iron objects people made were worked from them. Tutankhamun’s iron dagger was shown in 2016 to be of meteoritic origin.
              </li>
            </ul>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              It is true that all iron was formed in stars and came to Earth from space, but the same is true of almost every element heavier than hydrogen and helium, including the oxygen, calcium and carbon in our bodies. The verse’s wording also has a well-established non-physical meaning. We grade this a <em>possible reading</em>. The numerical patterns people find around this verse are examined on <PageLink to="mathematics">Numbers &amp; Mathematics</PageLink>.
            </p>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "navigation",
      status: "established",
      title: "“Through the stars they find way”",
      scripture: [{ verse: "6:97" }, { verse: "16:16" }],
      steps: [
        {
          heading: "Overview",
          gist: (
            <p>
              Desert travellers and sailors navigated by the stars for millennia. Muslim astronomers turned that into a precise science, with star catalogues, astrolabes and tables for finding latitude and the direction of Makkah. That work is still visible in the sky. Many bright stars carry Arabic names that passed into European languages through translated astronomy texts:
            </p>
          ),
          more: (
            <Table>
              <table>
                <thead>
                  <tr>
                    <th>Star</th>
                    <th>Arabic origin</th>
                    <th>Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Aldebaran</td>
                    <td>
                      <Ar>الدَّبَرَان</Ar> <Tr>al-dabarān</Tr>
                    </td>
                    <td>the follower (of the Pleiades)</td>
                  </tr>
                  <tr>
                    <td>Altair</td>
                    <td>
                      <Ar>الطَّائِر</Ar> <Tr>al-ṭāʾir</Tr>
                    </td>
                    <td>the flying [eagle]</td>
                  </tr>
                  <tr>
                    <td>Vega</td>
                    <td>
                      <Ar>الوَاقِع</Ar> <Tr>al-wāqiʿ</Tr>
                    </td>
                    <td>the swooping [eagle]</td>
                  </tr>
                  <tr>
                    <td>Deneb</td>
                    <td>
                      <Ar>ذَنَب</Ar> <Tr>dhanab</Tr>
                    </td>
                    <td>tail (of the hen/swan)</td>
                  </tr>
                  <tr>
                    <td>Rigel</td>
                    <td>
                      <Ar>رِجْل</Ar> <Tr>rijl</Tr>
                    </td>
                    <td>foot (of the giant, Orion)</td>
                  </tr>
                  <tr>
                    <td>Betelgeuse</td>
                    <td>
                      <Ar>يَد الجَوْزَاء</Ar> <Tr>yad al-jawzāʾ</Tr>
                    </td>
                    <td>hand of al-Jawzāʾ (Orion), garbled in transmission</td>
                  </tr>
                </tbody>
              </table>
            </Table>
          ),
        },
      ],
    },
    {
      kind: "topic",
      id: "beyond-the-regions",
      status: "interpretive",
      title: "“If it is possible for you to cross the boundaries of the heavens and the earth…”",
      scripture: [{ verse: "55:33" }],
      steps: [
        {
          heading: "What the words say",
          gist: (
            <p>
              The verse challenges jinn and humans to cross the boundaries (<Tr>aqṭār</Tr>) of the heavens and earth if they can. Its closing words, <Tr>lā tanfudhūna illā bi-sulṭān</Tr>, say literally that you cannot pass except with <Tr>sulṭān</Tr>, meaning authority or power. The translation shown renders them “wherever you will go, the kingdom is only His”: there is no escaping God’s dominion. Classical commentators mostly placed the verse in the context of the Day of Judgment.
            </p>
          ),
        },
        {
          heading: "What science says",
          gist: (
            <p>
              Leaving Earth requires reaching about 11.2 km/s, escape velocity, and leaving the Solar System needs even more. Only five spacecraft have ever been sent on paths that leave the Solar System. Voyager 1, the farthest, has travelled for nearly half a century and is still less than a light-day away.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              Some modern readers see space travel foreshadowed here: humans have passed beyond Earth’s bounds only through immense power. That reading depends on taking <Tr>sulṭān</Tr> as physical power, while the translation shown, like the classical commentators, understands it as God’s dominion. So we treat the space-travel link as a weak <em>possible reading</em>. The verse’s own context is the Hereafter.
            </p>
          ),
        },
      ],
    },
  ],
} satisfies Page;
