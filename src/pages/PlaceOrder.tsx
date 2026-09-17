import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  Minus,
  Plus,
  Shield,
  ShoppingBag,
  Trash2,
  Zap,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatINR } from "../data/courses";
import { useCart } from "../context/CartContext";
import "./PlaceOrder.css";

export function PlaceOrderPage() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    count,
    removeItem,
    updateQty,
    placeOrder,
    lastOrder,
    openCart,
  } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!items.length) {
      setError("Your cart is empty. Add a course first.");
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill name, email, and phone.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!/^[0-9+\-\s]{8,15}$/.test(phone)) {
      setError("Enter a valid phone number.");
      return;
    }
    const order = placeOrder({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    setOrderId(order.id);
    setPlaced(true);
    setError("");
  };

  if (placed) {
    return (
      <main className="place">
        <div className="place__aurora" aria-hidden />
        <div className="place__grid" aria-hidden />
        <header className="place__top">
          <Link to="/" className="place__brand">
            YOURSKILLS
          </Link>
        </header>
        <motion.div
          className="place__success"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <div className="place__success-icon">
            <CheckCircle2 size={40} />
          </div>
          <p className="place__eyebrow">Order confirmed</p>
          <h1>You're all set</h1>
          <p className="place__lede">
            Thanks{lastOrder?.name ? `, ${lastOrder.name}` : ""}. Your learning access is being
            prepared and a confirmation will land in your inbox.
          </p>
          <p className="place__order-id">Order ID · {orderId || lastOrder?.id}</p>
          <div className="place__success-actions">
            <Link to="/#catalog" className="btn btn--orange">
              Keep exploring
            </Link>
            <Link to="/" className="btn btn--ghost">
              Back home
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="place">
      <div className="place__aurora" aria-hidden />
      <div className="place__grid" aria-hidden />

      <header className="place__top">
        <Link to="/" className="place__brand">
          YOURSKILLS
        </Link>
        <button type="button" className="place__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back
        </button>
      </header>

      <div className="container place__hero">
        <motion.p
          className="place__eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Zap size={14} /> Secure checkout
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.55 }}
        >
          Place your order
        </motion.h1>
        <motion.p
          className="place__lede"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          Confirm your details, review your cart, and unlock YourSkills courses in one smooth step.
        </motion.p>
      </div>

      <div className="container place__trust">
        {[
          { icon: Lock, label: "Encrypted checkout" },
          { icon: Shield, label: "Privacy-first" },
          { icon: CreditCard, label: "Instant access" },
        ].map((t, i) => (
          <motion.div
            key={t.label}
            className="place__trust-pill"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
          >
            <t.icon size={15} />
            {t.label}
          </motion.div>
        ))}
      </div>

      {!items.length ? (
        <motion.div
          className="container place__empty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShoppingBag size={40} />
          <h2>Your cart is empty</h2>
          <p>Pick a course or membership, then come back to place your order.</p>
          <div className="place__empty-actions">
            <Link to="/#catalog" className="btn btn--orange">
              Browse courses
            </Link>
            <button type="button" className="btn btn--ghost" onClick={openCart}>
              Open cart
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="container place__layout">
          <motion.form
            className="place__form-card"
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2>Learner details</h2>
            <p className="place__form-hint">We’ll use this to deliver access and order updates.</p>

            <label>
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </label>
            <label>
              Phone
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                autoComplete="tel"
              />
            </label>
            <label>
              Note <span>(optional)</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Anything we should know?"
                rows={3}
              />
            </label>

            {error && <p className="place__error">{error}</p>}

            <button type="submit" className="btn btn--orange place__submit">
              Confirm & place order · {formatINR(subtotal)}
            </button>
          </motion.form>

          <motion.aside
            className="place__summary"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <div className="place__summary-head">
              <h2>Order summary</h2>
              <span>
                {count} item{count === 1 ? "" : "s"}
              </span>
            </div>

            <ul className="place__items">
              {items.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <small>
                      {item.kind === "membership" ? "Membership" : item.category} ·{" "}
                      {formatINR(item.price)}
                    </small>
                  </div>
                  <div className="place__item-actions">
                    {item.kind === "course" && (
                      <div className="place__qty">
                        <button
                          type="button"
                          aria-label="Decrease"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                    <button
                      type="button"
                      className="place__remove"
                      aria-label={`Remove ${item.title}`}
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="place__line-total">{formatINR(item.price * item.qty)}</p>
                </li>
              ))}
            </ul>

            <div className="place__totals">
              <div>
                <span>Subtotal</span>
                <strong>{formatINR(subtotal)}</strong>
              </div>
              <div>
                <span>Taxes & fees</span>
                <strong>Included</strong>
              </div>
              <div className="place__grand">
                <span>Total due</span>
                <strong>{formatINR(subtotal)}</strong>
              </div>
            </div>

            <Link to="/#catalog" className="place__continue">
              ← Continue shopping
            </Link>
          </motion.aside>
        </div>
      )}
    </main>
  );
}
