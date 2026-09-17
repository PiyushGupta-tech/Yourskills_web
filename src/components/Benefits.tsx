import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./Benefits.css";

const tags = [
  { label: "Personalized Teaching", color: "#3d8bff", rot: -18, x: -8, delay: 0.05 },
  { label: "Innovative", color: "#ffe14d", rot: 12, x: 10, delay: 0.12 },
  { label: "Time-saving", color: "#ff4db8", rot: -8, x: -4, delay: 0.18 },
  { label: "Data-driven", color: "#c8f542", rot: 22, x: 14, delay: 0.08 },
  { label: "Real-time", color: "#c8f542", rot: -28, x: -16, delay: 0.22 },
  { label: "Automated", color: "#ff4db8", rot: 6, x: 6, delay: 0.15 },
  { label: "Community Building", color: "#f0f0f0", rot: -14, x: -2, delay: 0.28, dark: true },
  { label: "Cutting-edge", color: "#ffe14d", rot: 32, x: 18, delay: 0.1 },
  { label: "Accessible", color: "#d8d8d8", rot: -6, x: 4, delay: 0.2, dark: true },
  { label: "Engaging", color: "#e8e8e8", rot: 16, x: -12, delay: 0.25, dark: true },
  { label: "Live sessions", color: "#3d8bff", rot: -22, x: 8, delay: 0.16 },
  { label: "Career support", color: "#ff4db8", rot: 9, x: -10, delay: 0.3 },
  { label: "Certification prep", color: "#c8f542", rot: -11, x: 12, delay: 0.14 },
  { label: "Industry mentors", color: "#ffe14d", rot: 24, x: -6, delay: 0.24 },
  { label: "62+ programs", color: "#f5f5f5", rot: -4, x: 2, delay: 0.32, dark: true },
];

export function Benefits() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section className="benefits" id="benefits" ref={ref} aria-labelledby="benefits-heading">
      <div className="benefits__sketches" aria-hidden="true">
        <svg viewBox="0 0 160 120" className="benefits__formula">
          <text x="10" y="50" fill="rgba(255,255,255,0.14)" fontSize="20" fontFamily="serif">
            A = πr²
          </text>
          <circle
            cx="110"
            cy="70"
            r="28"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="container">
        <motion.h2
          id="benefits-heading"
          className="benefits__title"
          initial={{ opacity: 0, rotate: -4, y: 30 }}
          whileInView={{ opacity: 1, rotate: -2.5, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="benefits__u-pink">Benefits</span> that elevate your{" "}
          <span className="benefits__u-green">learning experience</span>
        </motion.h2>

        <div className="benefits__pile" role="list">
          {tags.map((tag) => (
            <motion.span
              key={tag.label}
              role="listitem"
              className={`benefits__tag${tag.dark ? " benefits__tag--dark" : ""}`}
              style={{
                background: tag.color,
                ["--rot" as string]: `${tag.rot}deg`,
              }}
              initial={{ opacity: 0, y: -180, rotate: tag.rot - 40, x: tag.x }}
              animate={
                inView
                  ? { opacity: 1, y: 0, rotate: tag.rot, x: tag.x }
                  : { opacity: 0, y: -180, rotate: tag.rot - 40, x: tag.x }
              }
              transition={{
                delay: tag.delay,
                type: "spring",
                stiffness: 120,
                damping: 14,
                mass: 0.9,
              }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 5 }}
            >
              {tag.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
