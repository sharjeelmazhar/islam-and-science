import type { Page } from "../define";
import site from "@/data/site.json";
import { Callout, Card, Cards, Quote, Split, Table, Tr, Word } from "@/components/content/Text";
import { PageLink } from "@/components/content/PageLink";
import { Verse } from "@/components/scripture/Verse";
import { Grade } from "@/components/evidence/Grade";
import { ThreeLinks } from "@/components/evidence/ThreeLinks";
import { OrbitsViz } from "@/components/viz/OrbitsViz";

export default {
  slug: "earths-motion",
  title: "The Earth’s Motion: A Classical Debate",
  navTitle: "The Earth’s Motion: A Classical Debate",
  description:
    "In 1919 Imam Ahmad Raza Khan of Bareilly wrote a detailed defence of a stationary Earth, with 105 arguments. This page presents his case accurately and respectfully, sets out the evidence modern astronomy relies on, and explains how Muslim scholars read the verses today.",
  hook: "Imam Ahmad Raza Khan’s 1919 treatise on a stationary Earth, its 105 arguments, and what modern observation says.",
  part: "horizons",
  scale: 13,
  scene: "solar",
  flow: [
    {
      kind: "section",
      id: "why-this-page-exists",
      title: "Why this page exists",
      body: (
        <p className="font-serif text-xl leading-relaxed text-ink">
          Modern science says the Moon orbits the Earth, the Earth orbits the Sun, and the Sun orbits the centre of the Milky Way. Until about four centuries ago almost
          every astronomer in the world, Muslim, Christian and Greek, held the opposite: that the Earth is at rest at the centre. In the twentieth century one of the
          most influential Sunni scholars of South Asia defended that classical view in detail. His argument deserves to be known accurately, and so does the modern
          evidence. Here are both.
        </p>
      ),
    },
    {
      kind: "section",
      id: "imam-ahmad-raza-khan-1856-1921",
      title: "Imam Ahmad Raza Khan (1856–1921)",
      body: (
        <Split>
          <div>
            <p>
              Imam Aḥmad Riḍā Khān was born in Bareilly, in northern India, in 1856 and died there in 1921. He was a Ḥanafī jurist and a master of many sciences. His
              fatwa collection, <Tr>al-ʿAṭāyā al-Nabawiyya fī al-Fatāwā al-Riḍawiyya</Tr>, runs to many volumes, and his Urdu translation of the Qur’an,{" "}
              <Tr>Kanz al-Īmān</Tr>, is read by millions. He also wrote on mathematics and astronomy, including the astronomical timekeeping used to fix prayer times.
              He is revered as a <Tr>mujaddid</Tr> (renewer) by a large part of the Sunni world, especially in South Asia.
            </p>
            <p>
              In 1919, near the end of his life, he wrote three treatises defending the stationary Earth against the heliocentric astronomy taught in colonial India:
            </p>
            <ul>
              <li>
                <strong>
                  <Tr>Nuzūl-e-Āyāt-e-Furqān ba-Sukūn-e-Zamīn-o-Āsmān</Tr>
                </strong>
                : the case from the Qur’an and hadith that the earth and the heavens are at rest.
              </li>
              <li>
                <strong>
                  <Tr>Muʿīn-e-Mubīn bahr-e-Daur-e-Shams-o-Sukūn-e-Zamīn</Tr>
                </strong>{" "}
                (“A clear aid on the revolution of the Sun and the stillness of the Earth”): written in response to a sensational forecast (see below).
              </li>
              <li>
                <strong>
                  <Tr>Fauz-e-Mubīn dar Radd-e-Ḥarkat-e-Zamīn</Tr>
                </strong>{" "}
                (“A clear victory in refuting the motion of the Earth”): the main work, containing 105 arguments.
              </li>
            </ul>
          </div>
          <Callout title="Read it yourself">
            <p>
              An English rendering of <em>Fauz-e-Mubeen</em>, “A Fair Success Refuting Motion of Earth”, by Abdul Hamid Maiskar, was published in 2005 by
              Idara-e-Tahqiqat-e-Imam Ahmad Raza, Karachi. It is freely available on{" "}
              <a
                href="https://archive.org/details/AFairSuccessRefutingMotionOfEarthFauzEMubenDarRaddEHarkatEZamminByAhmadRazaKhan"
                target="_blank"
                rel="noopener"
              >
                the Internet Archive
              </a>
              .
            </p>
          </Callout>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "the-porta-prediction-of-17-december-1919",
      title: "The Porta prediction of 17 December 1919",
      body: (
        <>
          <p>
            In 1919 the American forecaster Albert F. Porta attracted worldwide newspaper attention by predicting that an unusual grouping of planets on 17 December 1919
            would cause violent storms and upheavals on Earth. Imam Ahmad Raza Khan answered in <em>Muʿīn-e-Mubīn</em>. He calculated the planets’ actual positions for
            that date, disputed the alignment Porta claimed, and rejected the idea that the planets would cause such a catastrophe.
          </p>
          <p>
            The day passed without any catastrophe. Mainstream astronomers of the time also dismissed Porta’s forecast. The episode is remembered as a demonstration of
            the Imam’s command of astronomical calculation.
          </p>
        </>
      ),
    },
    {
      kind: "section",
      id: "how-fauz-e-mubeen-is-built",
      title: "How Fauz-e-Mubeen is built",
      body: (
        <>
          <p>
            In his own introduction the Imam explains his method. He first sets out the premises of modern astronomy, and then uses those premises to show that the
            motion of the Earth leads to contradictions. It is an <em>internal</em> critique that meets the astronomers on their own ground.
          </p>
          <Table>
            <table>
              <thead>
                <tr>
                  <th>Part</th>
                  <th>Content (as described by the author)</th>
                  <th className="text-right">Proofs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Foreword</td>
                  <td>The accepted concepts of modern astronomy that the book will use</td>
                  <td className="text-right">—</td>
                </tr>
                <tr>
                  <td>Chapter 1</td>
                  <td>
                    Arguments from <em>repulsion</em> (centrifugal force) showing the motion of the Earth to be false
                  </td>
                  <td className="text-right font-mono">12</td>
                </tr>
                <tr>
                  <td>Chapter 2</td>
                  <td>
                    Arguments from <em>attraction</em> (Newtonian gravitation)
                  </td>
                  <td className="text-right font-mono">50</td>
                </tr>
                <tr>
                  <td>Chapter 3</td>
                  <td>Further proofs of the impossibility of the Earth’s motion</td>
                  <td className="text-right font-mono">43</td>
                </tr>
                <tr>
                  <td>Chapter 4</td>
                  <td>Replies to the objections astronomers raise in support of the Earth’s motion</td>
                  <td className="text-right">—</td>
                </tr>
                <tr>
                  <td>Conclusion</td>
                  <td>Proofs from revealed scripture for the revolution of the Sun and the stillness of the Earth</td>
                  <td className="text-right">—</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <strong>Total</strong>. The author notes that 15 were adapted from earlier works, and 90 are his own.
                  </td>
                  <td className="text-right font-mono">
                    <strong>105</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </Table>
          <p>
            The book ranges over centripetal and centrifugal force, gravitation, projectile motion, relative velocity, tides and the structure of the Earth, with
            geometric diagrams and logarithmic calculations throughout. It engages directly with Copernicus, Kepler and Newton, and with the classical Muslim
            astronomers.
          </p>
          <h3>A sample argument, in his words</h3>
          <Quote
            by={<strong>Fauz-e-Mubeen</strong>}
            cite="Chapter 2, “Thirteenth resistance” (English rendering by A. H. Maiskar, 2005, p. 137–138; lightly condensed)."
          >
            …if at all, had the air, like the earth, rotated around the direction of east, then as per your speculation and calculation, it was a must to a stone thrown
            high up in the sky to go away to the direction of east and fall it at a very distant place… But actually it falls at the same spot from where it was thrown.
          </Quote>
          <p>
            The reasoning is that if the ground moves hundreds of metres per second, a stone thrown straight up should land far from where it was thrown, yet it lands at
            the same spot. The Imam uses the astronomers’ own figures for the Earth’s speed to calculate how far the stone should drift.
          </p>
        </>
      ),
    },
    {
      kind: "section",
      id: "the-scriptural-case",
      title: "The scriptural case",
      body: (
        <>
          <p>
            The Imam’s scriptural argument, and that of the scholars who follow him, rests on a consistent pattern in the Qur’an. It repeatedly ascribes motion to the
            Sun and the Moon, saying they are “constantly moving”, that the Sun “moves towards its final point”, and that each “floats in an orbit”. It describes the
            earth as a resting place, upheld by God “that they do not tremble”.
          </p>
          <Split>
            <div className="space-y-8">
              <Verse at="35:41" />
              <p className="text-sm">
                The key word is <Word ar="أَن تَزُولَا" tr="an tazūlā" />, from <Tr>zawāl</Tr>: to move away, depart, cease. Imam Ahmad Raza Khan’s own translation,
                shown above, renders it “that they do not <em>tremble</em>”. God holds the heavens and the earth so that they do not move from their places. Other
                translators render it “lest they cease” or “lest they collapse”.
              </p>
              <Verse at="27:61" />
            </div>
            <div className="space-y-8">
              <Verse at="14:33" />
              <Verse at="36:38" />
              <p className="text-sm">
                The Sun “moves” (<Tr>tajrī</Tr>, literally “runs”) and the Sun and Moon are “constantly moving” (<Tr>dāʾibayn</Tr>), while the Earth is called{" "}
                <Tr>qarār</Tr>, a settled place “for dwelling” (27:61) and a “resting place” (40:64). Together with the hadith of the Sun’s prostration after it sets (
                <Tr>Ṣaḥīḥ al-Bukhārī</Tr> 3199), this is read as the Sun travelling around a resting Earth.
              </p>
            </div>
          </Split>
          <p>
            This was also the view of the great majority of classical Muslim scholars and astronomers, who worked within the Earth-centred cosmology inherited from
            Ptolemy and refined it greatly.
          </p>
        </>
      ),
    },
    {
      kind: "section",
      id: "see-the-two-descriptions-side-by-side",
      title: "See the two descriptions side by side",
      body: (
        <>
          <OrbitsViz start="geo" />
          <p className="text-sm text-ink-3">
            Geometrically, both descriptions reproduce the same positions in the sky. The loops traced by Mars and Venus in the Earth-centred view are why pre-modern
            astronomers needed epicycles. The scientific question is about <em>dynamics</em>: which frame is non-rotating and non-accelerating, so that the laws of
            motion hold without extra “fictitious” forces?
          </p>
        </>
      ),
    },
    {
      kind: "section",
      id: "what-modern-observation-shows",
      title: "What modern observation shows",
      body: (
        <>
          <p className="font-serif text-2xl leading-snug text-ink">
            Modern astronomy regards the Earth’s rotation and orbit as settled, because several independent effects predicted by them have been measured directly. Most
            of these observations were made before 1919, and some were refined later.
          </p>
          <Cards>
            <Card title="Stellar aberration" meta="1729">
              <p>
                James Bradley found that every star traces a small ellipse through the year, up to about 20.5 arcseconds across. The size matches Earth’s orbital speed
                of about 30 km/s, and it was the first direct evidence of the Earth’s motion.
              </p>
            </Card>
            <Card title="Stellar parallax" meta="1838">
              <p>
                Friedrich Bessel measured the tiny annual shift of the star 61 Cygni against more distant stars, as seen from opposite sides of Earth’s orbit. Parallax
                has since been measured for over a billion stars by the Gaia spacecraft.
              </p>
            </Card>
            <Card title="Foucault’s pendulum" meta="1851">
              <p>
                A long free pendulum’s plane of swing turns steadily, by 360° × sin(latitude) per sidereal day. That is about 131° per day at Makkah and a full circle at
                the poles, exactly as a rotating Earth predicts.
              </p>
            </Card>
            <Card title="Coriolis effects">
              <p>
                Large storms rotate one way in the northern hemisphere and the other way in the southern. Long-range projectiles and dropped objects are measurably
                deflected. Bodies dropped down deep mine shafts land slightly <em>east</em> of the plumb line, as rotation predicts.
              </p>
            </Card>
            <Card title="The equatorial bulge">
              <p>
                Earth’s equatorial radius (6,378 km) is about 21 km larger than its polar radius (6,357 km). That flattening is what a rotating, slightly fluid body
                should have.
              </p>
            </Card>
            <Card title="Spaceflight & GPS">
              <p>
                Interplanetary trajectories are computed in a frame centred on the Solar System’s centre of mass, and they arrive. GPS receivers must correct for Earth’s
                rotation during a signal’s travel time (the Sagnac effect).
              </p>
            </Card>
          </Cards>
          <h3>The thrown stone, answered by physics</h3>
          <p>
            Modern mechanics answers the Imam’s stone argument with <em>inertia</em>, the principle Galileo introduced. Before it is thrown, the stone is already moving
            eastward with the ground and the air at the same speed. Once released, nothing removes that eastward speed, so it keeps pace with the ground and lands
            essentially where it started, just as a ball tossed upward in a smoothly moving train lands back in your hand. Because the top of the stone’s path is a
            little farther from Earth’s axis, there is a tiny predicted deflection, and precise experiments detect exactly that.
          </p>
        </>
      ),
    },
    {
      kind: "section",
      id: "isnt-all-motion-relative",
      title: "“Isn’t all motion relative?”",
      body: (
        <Split>
          <div>
            <p>
              Supporters of the stationary Earth sometimes note that modern physics has no “absolute rest”. That is true, and it is worth stating carefully. You can
              describe the universe from a frame in which the Earth is fixed. Engineers routinely use an Earth-fixed frame for GPS and for everyday navigation. The{" "}
              <PageLink to="celestial-motion">3D model</PageLink> shows that such a description can reproduce every position in the sky.
            </p>
            <details className="more mt-4">
              <summary className="font-mono text-[0.72rem] tracking-[0.08em] text-ink-3 uppercase hover:text-gold">Read more</summary>
              <div className="pt-4">
                <p>
                  Physics does, however, distinguish frames that <em>rotate</em> or <em>accelerate</em> from frames that do not, and it does so by experiment. In a
                  rotating frame, a Foucault pendulum turns, gyroscopes drift, and centrifugal and Coriolis forces appear without any physical cause. Distant galaxies
                  would have to sweep around the Earth every day at speeds far greater than light. Every one of these effects is exactly what you would expect if the
                  Earth rotates within a non-rotating universe. That is why physicists conclude that the Earth rotates and orbits. Strictly, the Earth and Sun both
                  orbit their common centre of mass.
                </p>
              </div>
            </details>
          </div>
          <Callout title="In one sentence">
            <p className="font-serif text-xl leading-snug text-ink">
              Describing the Earth as “at rest” is a legitimate choice of viewpoint, and science says the Earth is a rotating, orbiting body because of dynamics, not
              viewpoint.
            </p>
          </Callout>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "how-muslim-scholars-read-these-verses-today",
      title: "How Muslim scholars read these verses today",
      body: (
        <>
          <p>
            Muslims agree that the Qur’an is true. The question is what these verses <em>mean</em>. Many contemporary scholars, including many who honour Imam Ahmad
            Raza Khan’s learning, read them as compatible with a moving Earth:
          </p>
          <ul>
            <li>
              <strong>The Sun and Moon do move.</strong> Every verse ascribing motion to them is literally true in modern astronomy. The Sun runs around the galaxy and
              the Moon orbits the Earth. The Qur’an nowhere states explicitly that the Earth has no motion.
            </li>
            <li>
              <strong>
                <Tr>Qarār</Tr> as stability.
              </strong>{" "}
              A place “for dwelling” (27:61) or a “resting place” (40:64) can describe the Earth’s steadiness for its inhabitants: no violent shaking, a stable climate
              and a firm surface. A ship on calm water is a steady home for passengers even while it sails.
            </li>
            <li>
              <strong>
                <Tr>Zawāl</Tr> as ceasing or collapsing.
              </strong>{" "}
              Many translators and commentators render 35:41 as God holding the heavens and earth “lest they cease” or “lest they collapse”. On that reading the verse
              concerns their continued existence and order, not orbital motion. Imam Ahmad Raza Khan’s rendering, “that they do not tremble”, is the reading his
              argument rests on.
            </li>
            <li>
              <strong>The Sun’s prostration</strong> in the hadith is widely understood as an unseen reality (see 22:18, which says the Sun, Moon and stars all
              prostrate), not a description of the Sun’s path across the sky.
            </li>
          </ul>
          <details className="more max-w-[68ch]">
            <summary className="font-mono text-[0.72rem] tracking-[0.08em] text-ink-3 uppercase hover:text-gold">Read more</summary>
            <div className="pt-4">
              <p>
                The classical tradition was not unanimous either. Al-Bīrūnī (d. 1048) discussed an astrolabe designed on the assumption that the Earth rotates and
                considered the question hard to settle. The Ottoman astronomer ʿAlī Qūshjī (d. 1474) argued that observation does not rule out the Earth’s rotation.
              </p>
              <p>
                Some modern writers go the other way and cite 27:88, “you will see the mountains, you will think that they are fixed, whereas, they will be moving like
                the moving of the clouds”, as a proof of the Earth’s rotation. The verse comes directly after a description of the trumpet of the Last Day (27:87), and
                classical commentators, like the future tense of the translation quoted here, placed it then. We do not use it as proof in either direction.
              </p>
            </div>
          </details>
        </>
      ),
    },
    {
      kind: "section",
      id: "our-summary",
      title: "Our summary",
      body: (
        <>
          <div className="space-y-3">
            <ThreeLinks status="debated" />
            <Grade status="debated" long />
          </div>
          <p className="font-serif text-xl leading-relaxed text-ink">
            <em>Fauz-e-Mubeen</em> is a serious and learned work in the long tradition of classical astronomy. It is carefully argued, mathematically detailed and written
            from deep conviction. Modern observational science, which draws on many independent measurements, holds that the Earth rotates and orbits the Sun, and
            treats the question as settled. Muslims who follow the Imam’s reading hold that the Qur’an’s wording favours a resting Earth. Others read the same verses as
            compatible with a moving Earth. On either reading, the verses themselves are true: the Sun and Moon each run their appointed courses, and it is God who
            holds the heavens and the earth.
          </p>
          <p className="text-sm text-ink-3">
            If you are a student of Imam Ahmad Raza Khan’s works and believe any detail above misrepresents him, please write with the reference and we will correct it:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </>
      ),
    },
  ],
} satisfies Page;
