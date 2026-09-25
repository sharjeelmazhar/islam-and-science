import type { Page } from "../define";
import { Callout, Quote, Split, Timeline, Tr } from "@/components/content/Text";
import { PageLink } from "@/components/content/PageLink";

export default {
  slug: "scholars",
  title: "Muslim Scientists",
  navTitle: "Muslim Scientists",
  description:
    "For centuries Muslim scholars led the world in mathematics, astronomy, optics and medicine, many of them explicitly motivated by the Qur’an’s call to observe. A timeline of key figures and what they actually achieved.",
  hook: "Al-Khwārizmī, Ibn al-Haytham, al-Bīrūnī, al-Ṣūfī and others who took the Qur’an’s call to observe literally.",
  part: "measure",
  scale: null,
  scene: "galaxy",
  flow: [
    {
      kind: "section",
      id: "why-a-believing-civilisation-became-a-scientific-one",
      title: "Why a believing civilisation became a scientific one",
      body: (
        <Split>
          <div>
            <p>
              Between roughly the 9th and 15th centuries, scholars working in Arabic and Persian, Muslims together with Christian, Jewish and Sabian colleagues under
              Muslim patronage, were at the frontier of mathematics, astronomy, optics and medicine. They translated and preserved Greek, Persian and Indian learning,
              criticised it, and went beyond it.
            </p>
            <p>
              Religion was a driving force, not an obstacle. Prayer times, the direction of Makkah and the lunar calendar required precise astronomy. Inheritance law
              required algebra. The hadith “for every disease there is a cure” encouraged medicine. The Qur’an’s repeated call to look, reflect and observe gave the
              whole enterprise dignity as worship.
            </p>
          </div>
          <Quote
            by={
              <>
                <strong>Ibn al-Haytham</strong> (d. c. 1040)
              </>
            }
            cite={
              <>
                <Tr>al-Shukūk ʿalā Baṭlamyūs</Tr>, “Doubts concerning Ptolemy” (tr. A. I. Sabra). An early statement of the critical scientific attitude.
              </>
            }
          >
            The duty of the man who investigates the writings of scientists, if learning the truth is his goal, is to make himself an enemy of all that he reads… He
            should also suspect himself as he performs his critical examination of it, so that he may avoid falling into either prejudice or leniency.
          </Quote>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "a-timeline-of-achievement",
      title: "A timeline of achievement",
      body: (
        <Timeline
          items={[
            {
              when: "c. 820",
              title: "al-Khwārizmī: algebra and algorithms",
              body: (
                <p>
                  His <em>al-Jabr wa’l-Muqābala</em> gave algebra its name and its first systematic treatment, with a large section on inheritance problems. His book on
                  Hindu numerals, translated into Latin as <em>Algoritmi de numero Indorum</em>, gave us the word “algorithm” and spread the decimal place-value system
                  to Europe.
                </p>
              ),
            },
            {
              when: "9th c.",
              title: "al-Kindī: the first codebreaker",
              body: (
                <p>
                  His treatise on deciphering encrypted messages contains the earliest known description of <em>frequency analysis</em>: counting how often each letter
                  appears to break a cipher.
                </p>
              ),
            },
            {
              when: "9th c.",
              title: "Thābit ibn Qurra: a theorem on amicable numbers",
              body: (
                <p>
                  Two numbers are “amicable” if each equals the sum of the other’s proper divisors, like 220 and 284. Thābit proved a rule for generating them from{" "}
                  <em>primes</em>: if p = 3·2<sup>n−1</sup> − 1, q = 3·2<sup>n</sup> − 1 and r = 9·2<sup>2n−1</sup> − 1 are all prime, then 2<sup>n</sup>·p·q and 2
                  <sup>n</sup>·r are amicable.
                </p>
              ),
            },
            {
              when: "c. 900",
              title: "al-Battānī: measuring the year",
              body: (
                <p>
                  He measured the solar year as 365 days, 5 hours, 46 minutes and 24 seconds, within minutes of the modern value, and refined many astronomical
                  constants. Copernicus cites him repeatedly.
                </p>
              ),
            },
            {
              when: "c. 900",
              title: "Abū Bakr al-Rāzī: clinical medicine",
              body: (
                <p>
                  Physician and head of hospitals in Rayy and Baghdad. His treatise on smallpox and measles is the first known clear clinical distinction between the
                  two diseases.
                </p>
              ),
            },
            {
              when: "964",
              title: "al-Ṣūfī: the first record of another galaxy",
              body: (
                <p>
                  His <em>Book of Fixed Stars</em> revised Ptolemy’s star catalogue with his own observations. It contains the earliest known description of the
                  Andromeda Galaxy, which he called “a little cloud”, about 2.5 million light-years away.
                </p>
              ),
            },
            {
              when: "c. 1000",
              title: "al-Zahrāwī: the surgeon’s manual",
              body: (
                <p>
                  The surgical volume of his encyclopaedia <em>al-Taṣrīf</em> illustrated some two hundred instruments and was used in Europe for centuries.
                </p>
              ),
            },
            {
              when: "c. 1011–21",
              title: "Ibn al-Haytham: optics and experiment",
              body: (
                <p>
                  His <em>Book of Optics</em> (<Tr>Kitāb al-Manāẓir</Tr>) showed by experiment that vision happens when light enters the eye, studied reflection,
                  refraction and the camera obscura, and insisted that theories be tested by controlled observation.
                </p>
              ),
            },
            {
              when: "1020s",
              title: (
                <>
                  Ibn Sīnā: the <em>Canon of Medicine</em>
                </>
              ),
              body: (
                <p>
                  <em>al-Qānūn fī al-Ṭibb</em> organised the medical knowledge of its age so well that it remained a standard textbook in European universities into
                  the 17th century.
                </p>
              ),
            },
            {
              when: "c. 1020s",
              title: "al-Bīrūnī: measuring the Earth",
              body: (
                <p>
                  Using a mountain near Nandana (in present-day Pakistan) and the dip of the horizon, he calculated the Earth’s radius as about 6,340 km, within about
                  0.5% of the modern mean value (6,371 km). He also measured the densities of many minerals and wrote a pioneering study of India.
                </p>
              ),
            },
            {
              when: "1070s",
              title: "ʿUmar al-Khayyām: cubic equations and a calendar",
              body: (
                <p>
                  He solved cubic equations geometrically, using intersecting conic sections, and led the reform that produced the highly accurate Jalālī solar
                  calendar.
                </p>
              ),
            },
            {
              when: "1154",
              title: "al-Idrīsī: mapping the known world",
              body: (
                <p>
                  His great world map and geography, the <em>Tabula Rogeriana</em>, was made for King Roger II of Sicily and remained unsurpassed for generations.
                </p>
              ),
            },
            {
              when: "1206",
              title: "al-Jazarī: ingenious machines",
              body: (
                <p>
                  His <em>Book of Knowledge of Ingenious Mechanical Devices</em> described water clocks, pumps and automata in construction-level detail.
                </p>
              ),
            },
            {
              when: "c. 1242",
              title: "Ibn al-Nafīs: the pulmonary circulation",
              body: (
                <p>
                  In a commentary on Ibn Sīnā’s anatomy, he correctly described blood passing from the right side of the heart through the lungs to the left,
                  overturning Galen’s idea of invisible pores in the heart’s wall, three centuries before this was described in Europe.
                </p>
              ),
            },
            {
              when: "1259",
              title: "Naṣīr al-Dīn al-Ṭūsī: the Marāgha observatory",
              body: (
                <p>
                  He founded a great research observatory and devised the “Ṭūsī couple”, a way to produce straight-line motion from two circles. He also treated
                  trigonometry as a discipline in its own right.
                </p>
              ),
            },
            {
              when: "c. 1300",
              title: "Kamāl al-Dīn al-Fārisī: the rainbow",
              body: (
                <p>
                  Using a water-filled glass sphere as a model raindrop, he explained the rainbow through refraction and reflection within droplets.
                </p>
              ),
            },
            {
              when: "14th c.",
              title: "Ibn al-Shāṭir: models before Copernicus",
              body: (
                <p>
                  His lunar and planetary models, built at the Umayyad Mosque in Damascus where he was timekeeper, are mathematically equivalent to some of those later
                  used by Copernicus.
                </p>
              ),
            },
            {
              when: "1424",
              title: "al-Kāshī: π to sixteen decimals",
              body: (
                <p>
                  In his <em>Treatise on the Circumference</em> he computed π correctly to 16 decimal places, a record that stood for about 170 years. He also
                  championed decimal fractions.
                </p>
              ),
            },
            {
              when: "1437",
              title: "Ulugh Beg: the Samarkand star catalogue",
              body: (
                <p>
                  The Timurid ruler-astronomer’s observatory produced a new catalogue of about a thousand stars, the first major independent catalogue since Ptolemy.
                </p>
              ),
            },
            {
              when: "1577",
              title: "Taqī al-Dīn: the Istanbul observatory",
              body: <p>He built an observatory in Istanbul and used mechanical clocks for astronomical timing.</p>,
            },
            {
              when: "1919",
              title: "Imam Ahmad Raza Khan: classical astronomy in the modern age",
              body: (
                <p>
                  The Ḥanafī jurist of Bareilly also wrote on mathematics, astronomy and timekeeping. His treatises of 1919 engaged critically with Newtonian mechanics
                  and with Albert Porta’s forecast of planetary catastrophe. See <PageLink to="earths-motion">The Earth’s Motion: A Classical Debate</PageLink>.
                </p>
              ),
            },
          ]}
        />
      ),
    },
    {
      kind: "section",
      id: "two-honest-notes",
      title: "Two honest notes",
      body: (
        <Split>
          <Callout title="Not “Muslim science” alone">
            <p>
              This was a shared civilisation. Christian translators such as Ḥunayn ibn Isḥāq, Jewish physicians such as Maimonides, and the Sabian Thābit ibn Qurra
              were part of it. Its language was Arabic, and its patronage and motivation were largely Islamic.
            </p>
          </Callout>
          <Callout title="A living tradition">
            <p>
              The lesson is not nostalgia. The same Qur’an that inspired al-Bīrūnī invites every generation to study the heavens and the earth, and Muslim scientists
              today continue that work in every field.
            </p>
          </Callout>
        </Split>
      ),
    },
  ],
} satisfies Page;
