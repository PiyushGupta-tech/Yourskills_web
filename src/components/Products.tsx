import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Brain,
  Cloud,
  Code2,
  LineChart,
  ShoppingCart,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { formatINR, getCourseById } from "../data/courses";
import { useCart } from "../context/CartContext";
import { CourseCatalog } from "./CourseCatalog";
import "./Products.css";

const coursesTaking = [
  { icon: Code2, name: "Web Development", hours: "42 hours spent", status: "In progress" },
  { icon: LineChart, name: "Data Science", hours: "28 hours spent", status: "In progress" },
  { icon: Brain, name: "AI & Machine Learning", hours: "18 hours spent", status: "In progress" },
  { icon: Cloud, name: "Cloud & DevOps", hours: "64 hours spent", status: "Completed" },
];

const plusFeatures = [
  {
    num: "01",
    title: "Member-only resources",
    desc: "Notes, cheat sheets, and practice materials for subscribers.",
  },
  {
    num: "02",
    title: "Priority support",
    desc: "Faster help for billing, access, and course questions.",
  },
  {
    num: "03",
    title: "Live Q&A sessions",
    desc: "Monthly sessions with educators for career guidance.",
  },
  {
    num: "04",
    title: "Digital certificate",
    desc: "YourSkills Plus member certificate when you complete your plan.",
  },
];

const careers = [
  { courseId: "cloud-engineer", title: "Cloud Engineer", rating: "4.8", ratings: "2.8K", hours: "42" },
  { courseId: "data-science-pro", title: "Data Scientist", rating: "4.7", ratings: "3.5K", hours: "58" },
  { courseId: "digital-marketer", title: "Digital Marketer", rating: "4.7", ratings: "1.9K", hours: "36" },
];

const skills = {
  development: [
    { name: "Python", learners: "8,200+" },
    { name: "Web Development", learners: "6,150+" },
    { name: "Data Science", learners: "5,480+" },
  ],
  creative: [
    { name: "UX/UI Design", learners: "3,920+" },
    { name: "Digital Illustration", learners: "2,640+" },
    { name: "Video Editing", learners: "2,180+" },
  ],
  business: [
    { name: "Cloud & DevOps", learners: "4,310+" },
    { name: "Analytics & BI", learners: "3,750+" },
    { name: "Project Management", learners: "1,890+" },
  ],
};

export function Products() {
  const { addMembership, addCourse, buyNow } = useCart();

  const scrollToCatalog = (hash = "#catalog") => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="products" id="programs" aria-labelledby="products-heading">
      <div className="container">
        <motion.div
          className="products__plus"
          id="pricing"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <p className="products__eyebrow">YourSkills Plus · Annual plan</p>
          <h2 id="products-heading">Build your career with a YourSkills Plus membership</h2>
          <p className="products__lead">
            Members get priority support, live sessions, and resources across every category. Join
            thousands of learners—starting at just <strong>₹200/year</strong>.
          </p>

          <ul className="products__bullets">
            <li>
              <Sparkles size={18} /> Get access to <strong>62+</strong> programs across tech,
              sciences & humanities
            </li>
            <li>
              <Users size={18} /> Learn from <strong>expert instructors</strong> with industry
              experience
            </li>
            <li>
              <Zap size={18} /> AI, Web Dev, Data, Cloud, Creative Arts & <strong>50+ topics</strong>
            </li>
            <li>
              <Award size={18} /> Certification prep for <strong>AWS, CompTIA, PMI</strong> & more
            </li>
          </ul>

          <div className="products__price-row">
            <div>
              <p className="products__price">₹200</p>
              <p className="products__price-note">per year · less than ₹17/month</p>
            </div>
            <div className="products__actions">
              <button type="button" className="btn btn--orange" onClick={addMembership}>
                <ShoppingCart size={16} style={{ marginRight: 6 }} />
                Subscribe now
              </button>
              <button type="button" className="btn btn--outline-dark" onClick={() => scrollToCatalog()}>
                Browse courses
              </button>
            </div>
          </div>

          <h3 className="products__subhead">What's included in YourSkills Plus</h3>
          <div className="products__plus-grid">
            {plusFeatures.map((f) => (
              <article key={f.num} className="products__plus-card">
                <span>{f.num}</span>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="products__dashboard"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="products__dash-copy">
            <p className="products__eyebrow products__eyebrow--light">Featured Program</p>
            <h3>Build job-ready skills with guided learning paths</h3>
            <p>
              Track lessons, practice projects, and certification prep in one place with YourSkills
              Plus.
            </p>
            <button type="button" className="products__link" onClick={() => scrollToCatalog()}>
              Continue learning →
            </button>
          </div>

          <div className="products__dash-panels">
            <div className="products__panel">
              <div className="products__panel-head">
                <h4>Courses you are taking</h4>
                <span>All categories</span>
              </div>
              <ul className="products__course-list">
                {coursesTaking.map((c) => (
                  <li key={c.name}>
                    <span className="products__course-icon">
                      <c.icon size={18} />
                    </span>
                    <div>
                      <strong>{c.name}</strong>
                      <small>{c.hours}</small>
                    </div>
                    <em className={c.status === "Completed" ? "done" : ""}>{c.status}</em>
                  </li>
                ))}
              </ul>
            </div>

            <div className="products__panel products__panel--stats">
              <div className="products__panel-head">
                <h4>My learning progress</h4>
                <span>This month</span>
              </div>
              <div className="products__stats">
                <div>
                  <small>Study time tracked</small>
                  <strong>124 hrs</strong>
                </div>
                <div>
                  <small>Courses completed</small>
                  <strong>36</strong>
                  <em>70% goal reached</em>
                </div>
                <div>
                  <small>Practice tests passed</small>
                  <strong>18</strong>
                </div>
                <div>
                  <small>Overall performance</small>
                  <strong>86%</strong>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="products__certs"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <h3>Get certified and get ahead in your career</h3>
          <p>
            Prep for certifications with comprehensive courses, practice tests, and special offers
            on exam vouchers through YourSkills.
          </p>
          <button
            type="button"
            className="products__link"
            onClick={() => scrollToCatalog()}
          >
            Explore certifications and vouchers →
          </button>
          <div className="products__cert-badges">
            <article>
              <h4>CompTIA</h4>
              <p>A+ · Network+ · Security+ · Linux+ · PenTest+</p>
              <small>Cloud, Networking, Cybersecurity</small>
            </article>
            <article>
              <h4>AWS</h4>
              <p>CLF · SAA · DVA · SOA</p>
              <small>Cloud, AI, Coding, Networking</small>
            </article>
            <article>
              <h4>PMI</h4>
              <p>PMP · CAPM · PMI-RMP</p>
              <small>Project & Program Management</small>
            </article>
          </div>
        </motion.div>

        <motion.div
          className="products__careers"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <h3>Ready to reimagine your career?</h3>
          <p>
            Get the skills and real-world experience employers want with YourSkills Career
            Accelerators.
          </p>
          <div className="products__career-grid">
            {careers.map((c) => {
              const course = getCourseById(c.courseId);
              return (
                <article key={c.title} className="products__career-card">
                  <BookOpen size={22} />
                  <h4>{c.title}</h4>
                  <p>
                    ★ {c.rating} · {c.ratings} ratings · {c.hours} total hours
                  </p>
                  {course && (
                    <>
                      <p className="products__career-price">{formatINR(course.price)}</p>
                      <div className="products__career-actions">
                        <button
                          type="button"
                          className="course-btn course-btn--ghost"
                          onClick={() => addCourse(course)}
                        >
                          Add to cart
                        </button>
                        <button
                          type="button"
                          className="course-btn course-btn--solid"
                          onClick={() => buyNow(course)}
                        >
                          Buy now
                        </button>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </motion.div>

        <CourseCatalog />

        <motion.div
          className="products__skills"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ marginTop: "3rem" }}
        >
          <article className="products__skill-hero">
            <h4>Generative AI is a top skill</h4>
            <p>12,400+ learners</p>
            <button type="button" onClick={() => scrollToCatalog()}>
              See AI & ML courses →
            </button>
          </article>
          <div className="products__skill-cols">
            {(
              [
                ["Development", skills.development],
                ["Design & Creative", skills.creative],
                ["Business & Cloud", skills.business],
              ] as const
            ).map(([title, list]) => (
              <div key={title}>
                <h5>{title}</h5>
                <ul>
                  {list.map((s) => (
                    <li key={s.name}>
                      <button
                        type="button"
                        className="products__skill-link"
                        onClick={() => scrollToCatalog()}
                      >
                        <span>{s.name}</span>
                        <em>{s.learners} learners</em>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
