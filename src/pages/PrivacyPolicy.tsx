import { motion } from "framer-motion";
import { ArrowLeft, Eye, Lock, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import "./PrivacyPolicy.css";

const sections = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "YourSkills Education (“YourSkills”, “we”, “us”) builds learning experiences that help people grow real-world skills. This Privacy Policy explains what information we collect, how we use it, and the choices you have when you use our website, courses, memberships, and checkout tools.",
      "By using YourSkills, you agree to the practices described here. If you do not agree, please do not use the service.",
    ],
  },
  {
    id: "collect",
    title: "Information we collect",
    body: [
      "Account & profile details: name, email address, and optional phone number when you place an order or join YourSkills Plus.",
      "Learning activity: courses you browse, add to cart, purchase, or continue; progress snapshots shown in your learning dashboard.",
      "Device & usage data: browser type, pages visited, approximate location derived from IP, and basic analytics that help us improve performance.",
      "Payment context: order totals and item titles. Card or UPI credentials are handled by payment partners — we do not store full payment card numbers on our servers.",
    ],
  },
  {
    id: "use",
    title: "How we use your information",
    body: [
      "Deliver courses, memberships, certificates, and order confirmations.",
      "Personalize recommendations and keep your cart and streak experience working smoothly.",
      "Send service messages about purchases, access, live sessions, or important product updates.",
      "Detect abuse, secure accounts, and improve site reliability and design.",
      "Meet legal, tax, and accounting requirements where applicable.",
    ],
  },
  {
    id: "share",
    title: "When we share data",
    body: [
      "We do not sell your personal information.",
      "We may share limited data with trusted processors that help us run YourSkills — for example hosting, email delivery, analytics, and payment processing — under contracts that require them to protect your data.",
      "We may disclose information if required by law, to protect learners and instructors, or to defend our rights in good faith.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & local storage",
    body: [
      "YourSkills uses essential browser storage to remember your cart and improve session continuity.",
      "We may use lightweight analytics cookies to understand which programs resonate with learners. You can control cookies through your browser settings; disabling them may limit cart or checkout features.",
    ],
  },
  {
    id: "retention",
    title: "Retention & security",
    body: [
      "We keep order and account records for as long as needed to provide access, support, and comply with legal obligations, then delete or anonymize them when no longer required.",
      "We use industry-standard safeguards such as encrypted transport (HTTPS), access controls, and least-privilege practices. No method of transmission is 100% secure, but we work continuously to reduce risk.",
    ],
  },
  {
    id: "rights",
    title: "Your choices & rights",
    body: [
      "You can request access to, correction of, or deletion of personal data we hold about you, subject to lawful exceptions.",
      "You can opt out of non-essential marketing emails using the unsubscribe link in those messages.",
      "Depending on where you live, you may have additional rights under applicable privacy laws. Contact us and we will respond within a reasonable timeframe.",
    ],
  },
  {
    id: "children",
    title: "Children",
    body: [
      "YourSkills is designed for learners and professionals generally aged 16+. We do not knowingly collect personal information from children under 16. If you believe a child has provided data, contact us and we will take appropriate steps to remove it.",
    ],
  },
  {
    id: "updates",
    title: "Updates to this policy",
    body: [
      "We may update this Privacy Policy as YourSkills evolves. When we make material changes, we will revise the “Last updated” date on this page and, where appropriate, provide additional notice.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions about privacy at YourSkills? Reach us at privacy@yourskills.app or through the Contact link on the homepage. We are happy to help.",
    ],
  },
];

const pillars = [
  {
    icon: Shield,
    title: "Protected by design",
    text: "Least-privilege access and encrypted connections by default.",
  },
  {
    icon: Eye,
    title: "Clear & human",
    text: "Plain language about what we collect and why.",
  },
  {
    icon: Lock,
    title: "You stay in control",
    text: "Request access, updates, or deletion anytime.",
  },
];

export function PrivacyPolicy() {
  return (
    <main className="privacy">
      <div className="privacy__aurora" aria-hidden="true" />
      <div className="privacy__grid" aria-hidden="true" />

      <header className="privacy__top">
        <Link to="/" className="privacy__brand">
          YOURSKILLS
        </Link>
        <Link to="/" className="privacy__back">
          <ArrowLeft size={16} />
          Back home
        </Link>
      </header>

      <div className="container privacy__hero">
        <motion.p
          className="privacy__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles size={14} /> Legal · Trust center
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.65 }}
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          className="privacy__lede"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.6 }}
        >
          Your learning journey stays yours. Here’s how YourSkills protects the data behind every
          course, cart, and streak.
        </motion.p>
        <motion.p
          className="privacy__updated"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
        >
          Last updated · September 17, 2026
        </motion.p>
      </div>

      <div className="container privacy__pillars">
        {pillars.map((p, i) => (
          <motion.article
            key={p.title}
            className="privacy__pillar"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
          >
            <span>
              <p.icon size={20} />
            </span>
            <h2>{p.title}</h2>
            <p>{p.text}</p>
          </motion.article>
        ))}
      </div>

      <div className="container privacy__body">
        <nav className="privacy__toc" aria-label="Policy sections">
          <p>On this page</p>
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="privacy__sections">
          {sections.map((section, i) => (
            <motion.section
              key={section.id}
              id={section.id}
              className="privacy__section"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: Math.min(i * 0.03, 0.2), duration: 0.45 }}
            >
              <h2>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              {section.body.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </motion.section>
          ))}
        </div>
      </div>

      <div className="container privacy__cta">
        <div>
          <h2>Ready to keep learning?</h2>
          <p>Explore programs, build your streak, and shop courses with confidence.</p>
        </div>
        <Link to="/#catalog" className="btn btn--orange">
          Browse courses
        </Link>
      </div>
    </main>
  );
}
