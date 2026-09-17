import { useCart } from "../context/CartContext";
import "./Footer.css";

export function Footer() {
  const { openCart } = useCart();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <strong>YOURSKILLS EDUCATION</strong>
          <p>Learn from the best. Build real-world skills for future-ready careers.</p>
        </div>
        <div className="footer__cols">
          <div>
            <h4>Explore</h4>
            <a href="#catalog">Courses</a>
            <a href="#pricing">Membership</a>
            <a href="#benefits">Why Us</a>
            <a href="#about">About</a>
          </div>
          <div>
            <h4>Connect</h4>
            <a href="#home">yourskills.app</a>
            <a href="#pricing">Contact</a>
            <button type="button" className="footer__cart-btn" onClick={openCart}>
              Cart
            </button>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} YourSkills Education. All rights reserved.</p>
        <p className="footer__credit">Designed with motion-first learning energy.</p>
      </div>
    </footer>
  );
}
