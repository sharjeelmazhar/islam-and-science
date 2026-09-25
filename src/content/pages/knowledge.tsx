import type { Page } from "../define";
import { Callout, Quote, Split, Tr, Word } from "@/components/content/Text";
import { PageLink } from "@/components/content/PageLink";
import { Verse } from "@/components/scripture/Verse";
import { Hadith } from "@/components/scripture/Hadith";

export default {
  slug: "knowledge",
  title: "Knowledge & Reflection",
  navTitle: "Knowledge & Reflection",
  description:
    "Why the Islamic tradition treats the study of the universe as a path to God, from the first revealed word “Read”, through the Qur’an’s repeated call to observe, to the Prophet’s teaching on seeking knowledge with a sincere intention.",
  hook: "Why Islam treats studying the universe as worship: the first revelation, the scholars, and seeking knowledge sincerely.",
  part: "start",
  scale: 0,
  scene: "reader",
  flow: [
    {
      kind: "section",
      id: "the-first-word-revealed-read",
      title: "The first word revealed: “Read”",
      body: (
        <Split>
          <Verse at="96:1" to="96:5" size="lg" />
          <div>
            <p>
              According to the well-known account in <Tr>Ṣaḥīḥ al-Bukhārī</Tr> (hadith 3), these were the first verses revealed to the Prophet Muḥammad ﷺ, in the cave
              of Ḥirāʾ. The very first command of the revelation is <Word ar="ٱقْرَأْ" tr="iqraʾ" />: read, recite.
            </p>
            <p>
              In five short verses they speak of creation, including the creation of the human being from an <Tr>ʿalaq</Tr> (see{" "}
              <PageLink to="embryology">Human Creation</PageLink>), of reading, of the pen, and of God teaching man “what he knew not”. Faith, learning and the study of
              how we were made appear together from the first moment.
            </p>
            <Callout title="Key idea">
              <p className="font-serif text-xl leading-snug text-ink">Knowledge is not an add-on to Islam. It is where the revelation begins.</p>
            </Callout>
          </div>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "do-they-not-look-the-call-to-observe",
      title: "“Do they not look?” The call to observe",
      body: (
        <>
          <p className="font-serif text-2xl leading-snug text-ink">
            Again and again the Qur’an asks its listeners to look at the sky, the earth, animals, the sea and themselves, and to draw conclusions. The verbs are strong
            ones: look, see, reflect, reason, travel, observe.
          </p>
          <Split>
            <div className="space-y-10">
              <Verse at="3:190" to="3:191" />
              <Verse at="29:20" />
              <Verse at="10:101" />
            </div>
            <div className="space-y-10">
              <Verse at="88:17" to="88:20" />
              <Verse at="51:20" to="51:21" />
              <Verse at="67:3" to="67:4" />
              <Verse at="45:13" />
            </div>
          </Split>
          <Callout title="“Travel in the land, see how He initially creates” (29:20)">
            <p>
              This is close to a description of field science. It asks people not only to believe that God created, but to go and look at <em>how</em> creation
              began: in rocks, fossils, landscapes and living things. The verse then connects that study to the next creation, the Resurrection.
            </p>
          </Callout>
        </>
      ),
    },
    {
      kind: "section",
      id: "knowledge-raises-people-in-rank",
      title: "Knowledge raises people in rank",
      body: (
        <Split>
          <div className="space-y-10">
            <Verse at="39:9" />
            <Verse at="58:11" />
            <Verse at="20:114" />
          </div>
          <div className="space-y-10">
            <Verse at="35:27" to="35:28" />
            <p>
              Notice the setting of 35:28. The verses immediately before it describe rain, fruits of various colours, mountains with white, red and pitch-black tracks,
              and the varied colours of people and animals. That is geology and biology. Then comes the line:{" "}
              <em>“Only those amongst His bondsmen who possess knowledge fear Allah.”</em> Classical commentators explain “those who possess knowledge” (
              <Tr>al-ʿulamāʾ</Tr>) primarily as those who truly know God. The setting shows that knowing His creation is one road to that knowledge.
            </p>
            <Verse at="30:22" />
          </div>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "what-the-prophet-taught-about-seeking-knowledge",
      title: "What the Prophet ﷺ taught about seeking knowledge",
      body: (
        <Split>
          <div className="space-y-10">
            <Hadith k="ibnmajah:224" />
            <Hadith k="muslim:2699" />
            <Hadith k="muslim:1631" />
          </div>
          <div className="space-y-10">
            <Hadith k="abudawud:3641" />
            <Hadith k="bukhari:71" />
          </div>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "the-intention-for-god-not-for-fame",
      title: "The intention: for God, not for fame",
      body: (
        <Split>
          <div>
            <p>
              The tradition is equally clear that <em>why</em> you learn matters as much as <em>what</em> you learn. Knowledge sought to win arguments, to be praised,
              or only for worldly gain is spiritually dangerous, even if the knowledge itself is true. Knowledge sought to know God, to serve people and to act rightly
              is worship.
            </p>
            <p>
              For a scientist or a student of science, this is liberating. The goal is not to be seen as clever or to score points in debates, including debates about
              religion. The goal is to see the order, beauty and precision of creation, to be moved by it, and to use what we learn for good.
            </p>
            <p>
              The Prophet ﷺ modelled this in his daily prayers: he asked for beneficial knowledge, and he sought refuge from knowledge that does not benefit.
            </p>
          </div>
          <div className="space-y-10">
            <Hadith k="muslim:1905" />
            <Hadith k="abudawud:3664" />
            <Hadith k="muslim:2722" />
            <Hadith k="ibnmajah:925" />
          </div>
        </Split>
      ),
    },
    {
      kind: "section",
      id: "the-great-imams-on-knowledge",
      title: "The great imams on knowledge",
      body: (
        <>
          <p>
            A few sayings from the scholars whom Muslims across the Sunni schools look to, together with ʿAlī ibn Abī Ṭālib, who is honoured by Sunni and Shia alike.
          </p>
          <Split>
            <Quote
              by={<strong>ʿAlī ibn Abī Ṭālib</strong>}
              cite={
                <>
                  in his counsel to Kumayl ibn Ziyād. Reported by Abū Nuʿaym in <Tr>Ḥilyat al-Awliyāʾ</Tr> and al-Khaṭīb al-Baghdādī in{" "}
                  <Tr>al-Faqīh wa’l-Mutafaqqih</Tr>; also in <Tr>Nahj al-Balāgha</Tr>.
                </>
              }
            >
              O Kumayl, knowledge is better than wealth. Knowledge guards you, while you have to guard wealth. Wealth decreases when it is spent, while knowledge
              increases when it is spent.
            </Quote>
            <div>
              <p lang="ar" dir="rtl" className="font-arabic text-2xl leading-loose text-gold">
                شَكَوْتُ إِلَى وَكِيعٍ سُوءَ حِفْظِي ... فَأَرْشَدَنِي إِلَى تَرْكِ الْمَعَاصِي
                <br />
                وَأَخْبَرَنِي بِأَنَّ الْعِلْمَ نُورٌ ... وَنُورُ اللهِ لَا يُهْدَى لِعَاصِي
              </p>
              <Quote
                by={
                  <>
                    <strong>Imam al-Shāfiʿī</strong> (d. 820)
                  </>
                }
                cite="lines attributed to him in his collected poetry."
              >
                I complained to Wakīʿ about my poor memory, so he advised me to abandon sins. He told me that knowledge is light, and the light of God is not given to
                the disobedient.
              </Quote>
            </div>
            <Quote
              by={
                <>
                  <strong>Imam Mālik ibn Anas</strong> (d. 795)
                </>
              }
              cite="as reported from him."
            >
              Knowledge is not a matter of narrating a great deal. Knowledge is a light that God places in the heart.
            </Quote>
            <Quote
              by={
                <>
                  <strong>Imam Aḥmad ibn Ḥanbal</strong> (d. 855)
                </>
              }
              cite="as reported from him."
            >
              People need knowledge more than they need food and drink, because food and drink are needed once or twice a day, but knowledge is needed with every
              breath.
            </Quote>
            <Quote
              by={
                <>
                  <strong>Imam Abū Ḥanīfah</strong> (d. 767)
                </>
              }
              cite={
                <>
                  his well-known definition of understanding (<Tr>fiqh</Tr>), cited throughout the Ḥanafī tradition. Knowledge, in this view, is meant to change how one
                  lives.
                </>
              }
            >
              Fiqh is the soul’s knowing what is for it and what is against it.
            </Quote>
            <Quote
              by={
                <>
                  <strong>Imam al-Ghazālī</strong> (d. 1111)
                </>
              }
              cite={
                <>
                  <Tr>al-Munqidh min al-Ḍalāl</Tr> (tr. W. Montgomery Watt), discussing people who rejected the proven mathematics of eclipses. His{" "}
                  <Tr>Iḥyāʾ ʿUlūm al-Dīn</Tr> opens with a whole book on knowledge.
                </>
              }
            >
              Great indeed is the crime against religion committed by anyone who supposes that Islam is to be championed by the denial of these mathematical sciences.
            </Quote>
          </Split>
        </>
      ),
    },
    {
      kind: "section",
      id: "causes-and-the-one-behind-them",
      title: "Causes, and the One behind them",
      body: (
        <Split>
          <div>
            <p>
              Science studies causes: why rain falls, why stars shine, why cells divide. Some people think that once a cause is found, God is no longer needed. The
              Islamic tradition answers that causes (<Tr>asbāb</Tr>) are real and worth studying, and that God is the One who creates both the cause and its effect,
              the “Causer of causes” (<Tr>Musabbib al-asbāb</Tr>).
            </p>
            <p>
              Two hadith capture the balance. In the first, the Prophet ﷺ tells a man to tie his camel <em>and</em> trust God: use the means, and do not worship them.
              In the second, God says that whoever attributes rain to a star alone has lost sight of Him, while whoever sees the rain as God’s mercy has believed. A
              meteorologist can explain condensation and still say “this is God’s mercy”. Both statements are true at once.
            </p>
            <p>
              This is why, for believers, deeper science should lead to deeper faith. The more precisely we understand the laws of nature, the more we see how finely
              they are set. That is the theme of <PageLink to="physics">Time, Matter &amp; Balance</PageLink>.
            </p>
          </div>
          <div className="space-y-10">
            <Hadith k="tirmidhi:2517" />
            <Hadith k="bukhari:846" />
          </div>
        </Split>
      ),
    },
  ],
} satisfies Page;
