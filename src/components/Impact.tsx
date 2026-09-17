import { motion } from "framer-motion";
import "./Impact.css";

export function Impact() {
  return (
    <section className="impact" id="about" aria-labelledby="impact-heading">
      <div className="container impact__grid">
        <motion.div
          className="impact__gem"
          aria-hidden="true"
          animate={{ y: [0, -14, 0], rotate: [12, 18, 12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h2
          id="impact-heading"
          className="impact__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          Discover <em>firsthand</em> the transformative{" "}
          <em>impact of YourSkills</em>.
        </motion.h2>

        <div className="impact__photos">
          <motion.figure
            className="impact__photo impact__photo--left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop"
              alt="Learner building confidence outdoors"
            />
          </motion.figure>

          <motion.div
            className="impact__star"
            aria-hidden="true"
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, type: "spring", stiffness: 160, damping: 12 }}
          />

          <motion.figure
            className="impact__photo impact__photo--right"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop"
              alt="Professional ready for career growth"
            />
          </motion.figure>
        </div>

        <motion.p
          className="impact__copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We blend foundational concepts with advanced technologies and practical,
          innovative teaching methods to build confident, future-ready learners.
        </motion.p>

        <div className="impact__advantages">
          {[
            {
              title: "Conceptual clarity through visualisation",
              desc: "Learn the basics in a modern way using advanced visual tools.",
            },
            {
              title: "Personalised learning programs",
              desc: "Digital paths tailored to your pace, goals, and strengths.",
            },
            {
              title: "Unmatched individual attention",
              desc: "One-on-one support from instructors who know the industry.",
            },
          ].map((item, i) => (
            <motion.article
              key={item.title}
              className="impact__adv"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <span className="impact__adv-num">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
