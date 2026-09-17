import { motion } from "framer-motion";
import "./FloatingNav.css";

const links = [
  { href: "#about", label: "About Us" },
  { href: "#features", label: "Features" },
  { href: "#benefits", label: "Benefits" },
  { href: "#catalog", label: "Programs" },
  { href: "#pricing", label: "Pricing" },
];

export function FloatingNav() {
  return (
    <motion.nav
      className="floating-nav"
      initial={{ y: 80, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Primary"
    >
      {links.map((link) => (
        <a key={link.href} href={link.href} className="floating-nav__link">
          {link.label}
        </a>
      ))}
    </motion.nav>
  );
}
