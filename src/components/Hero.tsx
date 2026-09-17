import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { MouseParallax } from "./MouseParallax";
import "./Hero.css";

export function Hero() {
  const { openCart, count } = useCart();

  return (
    <header className="hero" id="home">
      <div className="hero__sketches" aria-hidden="true">
        <svg className="hero__sketch hero__sketch--chem" viewBox="0 0 200 160">
          <path
            d="M40 40 L70 20 L100 40 L100 80 L70 100 L40 80 Z M100 40 L130 20 L160 40 L160 80 L130 100 L100 80"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.2"
          />
          <circle cx="40" cy="40" r="3" fill="rgba(255,255,255,0.25)" />
          <circle cx="100" cy="40" r="3" fill="rgba(255,255,255,0.25)" />
          <circle cx="160" cy="40" r="3" fill="rgba(255,255,255,0.25)" />
        </svg>
        <svg className="hero__sketch hero__sketch--math" viewBox="0 0 180 100">
          <text x="10" y="40" fill="rgba(255,255,255,0.2)" fontSize="22" fontFamily="serif">
            A = ab/2
          </text>
          <path
            d="M20 70 L90 70 L55 30 Z"
            fill="none"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="hero__top">
        <a href="#home" className="hero__brand">
          YOURSKILLS
        </a>
        <div className="hero__auth">
          <button type="button" className="hero__cart" onClick={openCart} aria-label="Open cart">
            <ShoppingBag size={18} />
            {count > 0 && <span>{count}</span>}
          </button>
          <a href="#pricing" className="hero__login">
            Log In
          </a>
          <a href="#catalog" className="hero__signup">
            Sign Up +
          </a>
        </div>
      </div>

      <MouseParallax strength={28} className="hero__orb hero__orb--star">
        <motion.div
          className="shape shape-star"
          animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </MouseParallax>

      <MouseParallax strength={18} className="hero__orb hero__orb--lime">
        <motion.div
          className="shape shape-sphere shape-sphere--lime"
          animate={{ y: [0, 22, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </MouseParallax>

      <MouseParallax strength={35} className="hero__orb hero__orb--torus">
        <motion.div
          className="shape shape-torus"
          animate={{ y: [0, -14, 0], rotate: [12, 18, 12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </MouseParallax>

      <MouseParallax strength={12} className="hero__orb hero__orb--purple">
        <motion.div
          className="shape shape-sphere shape-sphere--purple"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </MouseParallax>

      <MouseParallax strength={22} className="hero__orb hero__orb--green-arc">
        <motion.div
          className="shape shape-arc"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </MouseParallax>

      <motion.div
        className="hero__float hero__float--left"
        initial={{ opacity: 0, x: -40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="video-chip">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=280&h=180&fit=crop"
            alt="Student greeting class"
          />
        </div>
        <motion.div
          className="speech-bubble"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Good morning students!
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__float hero__float--right"
        initial={{ opacity: 0, x: 40, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="video-chip video-chip--sm">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=240&h=160&fit=crop"
            alt="Learners collaborating"
          />
        </div>
      </motion.div>

      <div className="hero__content">
        <motion.p
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          YOURSKILLS EDUCATION
        </motion.p>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          Unlock the{" "}
          <span className="hero__strike">future</span>
          <br />
          of <span className="hero__scribble">education</span>
        </motion.h1>
        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          Build real-world skills for future-ready careers — immersive programs
          by industry practitioners.
        </motion.p>
        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a href="#catalog" className="btn btn--light">
            Explore Courses
          </a>
          <a href="#pricing" className="btn btn--ghost">
            YourSkills Plus →
          </a>
        </motion.div>
      </div>
    </header>
  );
}
