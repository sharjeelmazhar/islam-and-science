import type { Page } from "../define";
import { Ar, Callout, Split, Tr, Word } from "@/components/content/Text";
import { Verse } from "@/components/scripture/Verse";
import { AbjadLab, AwlLab, PrimeLab, YearsLab } from "@/labs/ui";
import { Lab } from "@/components/content/pages/mathematics/Lab";
import { LetterStrip } from "@/components/content/pages/mathematics/LetterStrip";
import { Numbers } from "@/components/content/pages/mathematics/Numbers";

export default {
  slug: "mathematics",
  title: "Numbers & Mathematics",
  navTitle: "Numbers & Mathematics",
  description:
    "The arithmetic written into the Qur’an, 300 solar years that are 309 lunar ones, the inheritance fractions that shaped algebra, the number 19, primes, and famous number patterns, each checked against the text with calculators you can use yourself.",
  hook: "300 solar years and nine, inheritance fractions, the number 19, primes, and number patterns checked honestly.",
  part: "measure",
  scale: null,
  scene: "reader",
  flow: [
    {
      kind: "section",
      id: "how-this-page-works",
      title: "How this page works",
      body: (
        <p>
          Every count below was checked against the standard Uthmani text (Ḥafṣ reading, Kufan verse numbering: 114 surahs, 6,236 verses). Where a claim depends on a
          counting <em>choice</em>, we tell you the choice. The calculators let you check things yourself.
        </p>
      ),
    },
    {
      kind: "section",
      id: "arithmetic-written-into-the-text",
      title: "Arithmetic written into the text",
      body: (
        <>
          <p className="font-serif text-xl leading-snug text-ink-2">
            The Qur’an does not only mention numbers. In several places it adds, subtracts, multiplies and compares them explicitly.
          </p>
          <Split>
            <div className="space-y-6">
              <Verse at="2:196" />
              <p className="text-sm">
                <strong>3 + 7 = 10</strong>, and the verse states the total: “these are ten complete”.
              </p>
              <Verse at="7:142" />
              <p className="text-sm">
                <strong>30 + 10 = 40</strong>, again with the total stated.
              </p>
            </div>
            <div className="space-y-6">
              <Verse at="29:14" />
              <p className="text-sm">
                <strong>1000 − 50 = 950</strong>: Noah’s time among his people is given as a subtraction.
              </p>
              <Verse at="2:261" />
              <p className="text-sm">
                <strong>7 × 100 = 700</strong>, and “Allah may increase even more than this for whomsoever He wills”: a lesson in growth by multiplication.
              </p>
            </div>
          </Split>
          <Verse at="8:65" to="8:66" />
          <p>
            These verses set a ratio and then revise it: first twenty to two hundred and a hundred to a thousand (<strong>1 : 10</strong>), then, once God “lightened
            the burden”, a hundred to two hundred and a thousand to two thousand (<strong>1 : 2</strong>). The ratios are stated twice with different numbers, as a
            mathematician would check a proportion.
          </p>
        </>
      ),
    },
    {
      kind: "topic",
      id: "three-hundred-and-nine",
      status: "established",
      title: "“Three hundred years, and nine more”",
      lede: "The sleepers of the cave stayed “three hundred years, and nine more”. The difference between solar and lunar years gives exactly that.",
      scripture: [{ verse: "18:25" }],
      aside: (
        <Lab title="Solar ↔ lunar years" note="Enter a number of solar years.">
          <YearsLab />
        </Lab>
      ),
      steps: [
        {
          heading: "What the numbers say",
          // The arithmetic is the punchline, so the whole step stays visible.
          gist: (
            <>
              <p>A solar (tropical) year lasts 365.2422 days. A lunar year of twelve months lasts about 354.3671 days. So:</p>
              <p className="font-mono text-[0.95rem]">
                300 × 365.2422 ÷ 354.3671 = <strong>309.2</strong> lunar years
              </p>
              <p>
                Three hundred solar years are, to the nearest whole year, three hundred and <em>nine</em> lunar years.
              </p>
            </>
          ),
        },
        {
          heading: "What the classical scholars said",
          gist: (
            <p>
              This is not a modern discovery. Ibn Kathīr (d. 1373) wrote in his commentary: “The length of time was three hundred plus nine years in lunar years, which
              is three hundred years in solar years. The difference between one hundred lunar years and one hundred solar years is three years, which is why after
              mentioning three hundred, Allah says, ‘adding nine’.” He also records Qatādah’s different view, that the figure was a claim of the People of the Book,
              answered by the next verse: “Allah knows best how long they stayed”.
            </p>
          ),
        },
        {
          heading: "How close is the match?",
          gist: (
            <p>
              The arithmetic is exact to the year, and classical scholars noticed it. We grade it <em>consistent with established science</em>. The Arabian listeners
              used lunar months, while their Christian and Jewish neighbours used solar calendars, and the verse gives the figure that fits both.
            </p>
          ),
        },
      ],
    },
    {
      kind: "section",
      id: "he-has-kept-count-of-all-things",
      title: "“He has kept count of all things”",
      body: (
        <Split>
          <div>
            <p>
              The Qur’an describes God as having “kept count of all things”, and the Sun and Moon as moving by exact reckoning. It fixed the Moon’s stages “that you
              know the counting of the years, and calculation”.
            </p>
            <p>
              This matters to anyone who does physics. In 1960 the physicist Eugene Wigner wrote a famous essay on “the unreasonable effectiveness of mathematics in
              the natural sciences”. Why should equations worked out on paper describe planets, atoms and light so precisely? For a believer the answer is natural. The
              universe is the work of a Creator who made everything with number and measure, and gave human minds the ability to discover it.
            </p>
          </div>
          <aside className="space-y-10">
            <Verse at="72:28" />
            <Verse at="10:5" />
          </aside>
        </Split>
      ),
    },
    {
      kind: "topic",
      id: "inheritance",
      status: "established",
      title: "Fractions of inheritance, and the birth of algebra",
      lede: "The Qur’an’s inheritance verses assign exact fractions: ½, ¼, ⅛, ⅔, ⅓, ⅙. Working them out in real cases became one of the great drivers of Islamic mathematics.",
      scripture: [{ verse: "4:11" }],
      steps: [
        {
          heading: "From verses to al-jabr",
          gist: (
            <p>
              Around 820 CE in Baghdad, Muḥammad ibn Mūsā al-Khwārizmī wrote <em>al-Kitāb al-Mukhtaṣar fī Ḥisāb al-Jabr wa’l-Muqābala</em>. The word “algebra” comes
              from its title, and “algorithm” from his name. A large part of the book is devoted to inheritance problems. Dividing estates according to the Qur’anic
              shares, with debts and bequests, called for systematic methods of solving equations.
            </p>
          ),
        },
        {
          heading: "When the fractions add up to more than one",
          gist: (
            <p>
              Sometimes the prescribed shares exceed the whole estate. In a famous case called <Tr>al-Minbariyya</Tr>, the deceased leaves a wife (⅛), two daughters
              (⅔), a father (⅙) and a mother (⅙). Over a common denominator of 24 that is 3 + 16 + 4 + 4 = 27 parts, more than 24. ʿAlī ibn Abī Ṭālib, according to
              the well-known report, was asked about it while giving a sermon and answered at once: “Her eighth has become a ninth.” Every share is scaled down in
              proportion (<Tr>al-ʿawl</Tr>), so the wife receives 3/27 = 1/9. Most jurists followed this method. Ibn ʿAbbās famously disagreed.
            </p>
          ),
        },
      ],
    },
    {
      kind: "section",
      id: "al-minbariyya-her-eighth-became-a-ninth",
      title: "al-Minbariyya: “her eighth became a ninth”",
      body: (
        <>
          <p>
            Top: the Qur’anic shares over 24, which add up to 27. Bottom: after proportional reduction (<Tr>ʿawl</Tr>) over 27.
          </p>
          <AwlLab />
        </>
      ),
    },
    {
      kind: "topic",
      id: "nineteen",
      status: "debated",
      title: "The number nineteen",
      lede: "“Above it are nineteen guards.” A single verse, followed by an unusually long explanation of why God mentioned the number.",
      scripture: [{ verse: "74:30", to: "74:31" }],
      steps: [
        {
          heading: "Facts you can verify",
          gist: (
            <ul>
              <li>
                The basmala, <Ar>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</Ar>, is written with <strong>19 letters</strong> (see below).
              </li>
              <li>
                There are <strong>114 surahs = 6 × 19</strong>.
              </li>
            </ul>
          ),
          more: (
            <ul>
              <li>
                The basmala occurs <strong>114 times</strong>. It opens 113 surahs (all except Sūrat al-Tawbah, 9), and appears once more inside Sūrat al-Naml (27:30).
              </li>
              <li>
                From the surah missing its basmala (9) to the surah with the extra one (27) is exactly <strong>19 surahs</strong>, counting both. The sum of those
                surah numbers, 9 + 10 + … + 27, is <strong>342 = 18 × 19</strong>.
              </li>
              <li>
                The first revelation, Sūrat al-ʿAlaq (96), is the <strong>19th surah counting from the end</strong>, and it has <strong>19 verses</strong>.
              </li>
            </ul>
          ),
        },
        {
          heading: "A cautionary history",
          gist: (
            <p>
              In the 1970s Rashad Khalifa used an early computer to search for 19-based patterns, and his findings spread widely. Many of his later counts relied on
              non-standard spellings or selective rules. He eventually claimed to be a messenger and declared two verses of the Qur’an (9:128–129) to be later
              additions because they did not fit his code. Scholars of every Muslim school rejected this. The lesson is clear: a numerical theory must never be allowed
              to overrule the preserved text.
            </p>
          ),
        },
        {
          heading: "Our assessment",
          gist: (
            <p>
              The facts listed above are real and anyone can check them. Their <em>significance</em> is debated. 74:31 itself says the number was given as a test and
              to strengthen the faith of believers, and it does not describe a code. We present these as genuine curiosities, not as the proof of the Qur’an.
            </p>
          ),
        },
      ],
    },
    {
      kind: "section",
      id: "the-nineteen-letters-of-the-basmala",
      title: "The nineteen letters of the basmala",
      body: (
        <>
          <p>
            As written in the muṣḥaf. The alif of <Tr>al-Raḥmān</Tr> is a small superscript mark, not a full letter, so it is not counted.
          </p>
          <LetterStrip />
        </>
      ),
    },
    {
      kind: "section",
      id: "seven-nineteen-and-other-primes",
      title: "Seven, nineteen, and other primes",
      body: (
        <Split>
          <div className="space-y-6">
            <p>
              A prime number has no divisors except 1 and itself. Two numbers that recur in the Qur’an are prime: <strong>7</strong> (the seven heavens, and the seven
              verses of al-Fātiḥah, “seven verses… which are often repeated”, 15:87) and <strong>19</strong>. Here are the whole numbers the Qur’an mentions, with the
              primes highlighted:
            </p>
            <Numbers
              items={[
                ["1", "112:1"],
                ["2", "16:51"],
                ["3", "18:22"],
                ["4", "9:36"],
                ["5", "18:22"],
                ["6", "7:54"],
                ["7", "2:29"],
                ["8", "69:7"],
                ["9", "17:101"],
                ["10", "2:196"],
                ["11", "12:4"],
                ["12", "9:36"],
                ["19", "74:30"],
                ["20", "8:65"],
                ["30", "46:15"],
                ["40", "2:51"],
                ["50", "29:14"],
                ["60", "58:4"],
                ["70", "9:80"],
                ["80", "24:4"],
                ["99", "38:23"],
                ["100", "2:259"],
                ["200", "8:65"],
                ["300", "18:25"],
                ["1,000", "97:3"],
                ["2,000", "8:66"],
                ["3,000", "3:124"],
                ["5,000", "3:125"],
                ["50,000", "70:4"],
                ["100,000", "37:147"],
              ]}
            />
            <p>
              An honest note: primes are common among small numbers. A quarter of the numbers below 100 are prime, and five of the first ten whole numbers above 1 (2,
              3, 5, 7 and 11) are. So a prime turning up is not remarkable in itself. The total number of verses, 6,236 = 2 × 2 × 1,559, is not prime, and neither is
              the number of surahs, 114.
            </p>
          </div>
          <aside>
            <Lab title="Prime checker" note="Is it prime? What are its factors? Is it a multiple of 19?">
              <PrimeLab />
            </Lab>
          </aside>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "middles-and-letter-values",
      title: "Middles and letter values",
      body: (
        <>
          <Split>
            <div>
              <h3>“A middle nation” in the middle</h3>
              <p>
                Sūrat al-Baqarah has 286 verses in the Kufan count. Verse <strong>143</strong>, exactly half of 286, is the one that calls the Muslim community{" "}
                <Word ar="أُمَّةً وَسَطًا" tr="ummatan wasaṭan" />, “a middle (balanced) nation”. The arithmetic is exact. The observation depends on the Kufan verse
                count, since other classical counting traditions number al-Baqarah slightly differently.
              </p>
              <h3>Iron: 57 and 26</h3>
              <p>
                In the traditional <Tr>abjad</Tr> system every Arabic letter has a number. <Ar>الحديد</Ar> (<Tr>al-ḥadīd</Tr>, “the iron”) adds up to{" "}
                <strong>57</strong>, and Sūrat al-Ḥadīd is surah <strong>57</strong>, which is also exactly half of 114. Without the article, <Ar>حديد</Ar> totals{" "}
                <strong>26</strong>, the atomic number of iron. A caution: iron’s most common isotope is iron-56 (about 92%). Iron-57 exists but makes up only about
                2%, so claims linking “57” to iron’s isotopes are misleading.
              </p>
            </div>
            <Lab title="Abjad calculator" note="Type Arabic. Diacritics are ignored. Conventions: ة = 5, ى = 10, ء = 1.">
              <AbjadLab />
            </Lab>
          </Split>
          <p className="text-sm text-ink-3">
            The basmala totals 786, the number many Muslims in South Asia write as a shorthand for it. Abjad values are a traditional convention for letters, not part
            of the Qur’an’s meaning. Treat these results as curiosities.
          </p>
        </>
      ),
    },
    {
      kind: "section",
      id: "pattern-or-coincidence-how-to-tell",
      title: "Pattern or coincidence? How to tell",
      body: (
        <Split>
          <div>
            <p>
              The Qur’an has about 77,000 words and 320,000 letters. In any text that size, if you are free to choose <em>what</em> to count and <em>how</em>, you
              will always find “amazing” numbers. Mathematicians call this the law of truly large numbers. It is also known as the Texas sharpshooter fallacy: fire at
              a barn, then paint the target around the bullet holes.
            </p>
            <p>Two popular examples, checked against the text:</p>
            <ul>
              <li>
                <strong>
                  “The word <em>month</em> appears 12 times.”
                </strong>{" "}
                <em>True under one rule.</em> The singular <Tr>shahr</Tr>, with any attached particles, occurs exactly 12 times. If the dual <Tr>shahrayn</Tr> (2)
                and the plural <Tr>ashhur</Tr> (6) are included, the total is 20.
              </li>
              <li>
                <strong>
                  “The word <em>day</em> appears 365 times.”
                </strong>{" "}
                <em>Depends entirely on the rule.</em> Our count of singular forms of <Tr>yawm</Tr>, with prefixes and suffixes, gives 444, or 374 without{" "}
                <Tr>yawmaʾidhin</Tr> (“on that day”). Reaching exactly 365 requires a particular selection of forms.
              </li>
              <li>
                <strong>“Makkah divides the globe at the golden ratio.”</strong> Makkah lies at 21.42° N. Its distance to the South Pole divided by its distance to
                the North Pole is 111.42 / 68.58 = 1.625, close to the golden ratio 1.618 but 0.4% off. Almost any city is “close” to <em>some</em> famous number.
              </li>
            </ul>
            <p>
              A numerical pattern deserves attention when it uses the standard text, has counting rules fixed <em>before</em> looking, can be reproduced by anyone,
              and would be very unlikely by chance. Most viral claims fail at least one of those tests. The Qur’an’s miracle has never rested on number games. Its
              language, guidance and preservation are its proof, so the believer loses nothing by being strict here.
            </p>
          </div>
          <aside>
            <Callout title="A rule we follow">
              <p>We never adjust the text to fit a number. Counting rules are chosen before counting, and they are always stated.</p>
            </Callout>
          </aside>
        </Split>
      ),
    },
  ],
} satisfies Page;
