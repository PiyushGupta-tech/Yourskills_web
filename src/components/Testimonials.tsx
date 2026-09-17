import { motion } from "framer-motion";
import "./Testimonials.css";

const quotes = [
  {
    text: "The course did a great job explaining AI—from development through application. I appreciated the varying perspectives presented, which were helpful in understanding how to use AI responsibly as a tool in my profession.",
    name: "Chitra Mehta",
    role: "Generative AI & ML graduate",
    initials: "CM",
    hash: "#catalog",
    link: "View AI courses →",
  },
  {
    text: "YourSkills was truly a game-changer and a great guide for me as we brought our product to life with modern web and mobile skills.",
    name: "Arjun Kapoor",
    role: "Technical Co-Founder, CTO",
    initials: "AK",
    hash: "#catalog",
    link: "View Web Development courses →",
  },
  {
    text: "YourSkills gives you the ability to be persistent. I learned exactly what I needed to know in the real world. It helped me sell myself to get a new role.",
    name: "Rohan Verma",
    role: "Cloud & DevOps professional",
    initials: "RV",
    hash: "#catalog",
    link: "View Cloud & DevOps courses →",
  },
];

export function Testimonials() {
  return (
    <section className="testimonials" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <motion.h2
          id="testimonials-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why learners choose <em>YourSkills</em>
        </motion.h2>

        <div className="testimonials__grid">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={q.name}
              className="testimonials__card"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
            >
              <p>“{q.text}”</p>
              <footer>
                <span className="testimonials__avatar" aria-hidden>
                  {q.initials}
                </span>
                <div>
                  <strong>{q.name}</strong>
                  <small>{q.role}</small>
                </div>
              </footer>
              <a href={q.hash}>{q.link}</a>
            </motion.blockquote>
          ))}
        </div>

        <motion.div
          className="testimonials__why"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <h3>Why Choose YourSkills Education?</h3>
          <ul>
            <li>Expert instructors with industry experience</li>
            <li>Live classes and interactive sessions</li>
            <li>Lifetime access to course materials</li>
            <li>Career support and job assistance</li>
            <li>Affordable pricing with payment plans</li>
            <li>Certificate upon completion</li>
          </ul>
          <div className="testimonials__stats">
            <div>
              <strong>50K+</strong>
              <span>Students Enrolled</span>
            </div>
            <div>
              <strong>100+</strong>
              <span>Courses Available</span>
            </div>
            <div>
              <strong>4.8/5</strong>
              <span>Average Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
