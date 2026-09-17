import { motion } from "framer-motion";
import "./StreakCalendar.css";

const days = [
  { label: "Wed", state: "done" as const },
  { label: "Thu", state: "done" as const },
  { label: "Fri", state: "today" as const },
  { label: "Sat", state: "upcoming" as const, date: "8" },
  { label: "Sun", state: "upcoming" as const, date: "9" },
  { label: "Mon", state: "upcoming" as const, date: "10" },
  { label: "Tue", state: "upcoming" as const, date: "11" },
];

const miniDays = [
  { n: 1, off: true },
  { n: 2, off: true },
  { n: 3 },
  { n: 4 },
  { n: 5, done: true },
  { n: 6, done: true },
  { n: 7, today: true },
  { n: 8 },
  { n: 9 },
  { n: 10 },
  { n: 11 },
  { n: 12 },
  { n: 13 },
  { n: 14 },
];

function DoubleCheck({ tone }: { tone: "orange" | "white" }) {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
      <path
        d="M1.5 7.5L5.5 11.5L13 3"
        stroke={tone === "white" ? "#fff" : "#FF5A1F"}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7.5L12 11.5L20.5 3"
        stroke={tone === "white" ? "#fff" : "#FF5A1F"}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StreakCalendar() {
  return (
    <section className="streak" id="features" aria-labelledby="streak-heading">
      <div className="streak__glow" aria-hidden="true" />
      <div className="container streak__layout">
        <div className="streak__inner">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 id="streak-heading" className="streak__count">
              7 days
            </h2>
            <p className="streak__label">Learning streak</p>
          </motion.div>

          <motion.div
            className="streak__card"
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="streak__rail">
              <div className="streak__capsule" aria-hidden="true" />
              {days.map((day, i) => (
                <motion.div
                  key={day.label}
                  className={`streak__day streak__day--${day.state}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                >
                  <span className="streak__dow">{day.label}</span>
                  <div className="streak__mark">
                    {day.state === "done" && <DoubleCheck tone="orange" />}
                    {day.state === "today" && (
                      <motion.div
                        className="streak__today"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <DoubleCheck tone="white" />
                      </motion.div>
                    )}
                    {day.state === "upcoming" && (
                      <span className="streak__date">{day.date}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p
            className="streak__msg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            You're on fire! Time to celebrate
          </motion.p>
        </div>

        <motion.div
          className="streak__visual"
          initial={{ opacity: 0, x: 40, scale: 0.94 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="streak__photo"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=720&h=900&fit=crop"
              alt=""
            />
            <div className="streak__photo-fade" />
          </motion.div>

          <motion.div
            className="streak__mini-cal"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="streak__mini-head">
              <span>September</span>
              <strong>2026</strong>
            </div>
            <div className="streak__mini-week">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="streak__mini-grid">
              {miniDays.map((d) => (
                <span
                  key={d.n}
                  className={[
                    d.off ? "is-off" : "",
                    d.done ? "is-done" : "",
                    d.today ? "is-today" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {d.n}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="streak__flame"
            animate={{ y: [0, -6, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="streak__flame-icon" />
            <div>
              <strong>On fire</strong>
              <small>Best week yet</small>
            </div>
          </motion.div>

          <motion.div
            className="streak__hours"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <strong>2h 40m</strong>
            <small>studied today</small>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
