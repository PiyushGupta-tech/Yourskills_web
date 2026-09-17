import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { formatINR } from "../data/courses";
import { useCart } from "../context/CartContext";
import "./CheckoutModal.css";

export function CheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    subtotal,
    placeOrder,
    lastOrder,
    openCart,
  } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!items.length) {
      setError("Your cart is empty.");
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
    setShowSuccess(true);
    setError("");
    setName("");
    setEmail("");
    setPhone("");
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setOrderId("");
  };

  return (
    <>
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.button
              type="button"
              className="checkout-backdrop"
              aria-label="Close checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCheckout}
            />
            <motion.div
              className="checkout-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Place order"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <header className="checkout-modal__head">
                <div>
                  <h2>Place your order</h2>
                  <p>Secure checkout for YourSkills courses</p>
                </div>
                <button type="button" className="cart-icon-btn" onClick={closeCheckout} aria-label="Close">
                  <X size={18} />
                </button>
              </header>

              <div className="checkout-modal__grid">
                <form className="checkout-form" onSubmit={onSubmit}>
                  <label>
                    Full name
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
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
                  {error && <p className="checkout-error">{error}</p>}
                  <div className="checkout-actions">
                    <button type="button" className="btn btn--ghost-dark" onClick={() => { closeCheckout(); openCart(); }}>
                      Back to cart
                    </button>
                    <button type="submit" className="btn btn--orange">
                      Confirm & place order
                    </button>
                  </div>
                </form>

                <aside className="checkout-summary">
                  <h3>Order summary</h3>
                  <ul>
                    {items.map((item) => (
                      <li key={item.id}>
                        <span>
                          {item.title} × {item.qty}
                        </span>
                        <strong>{formatINR(item.price * item.qty)}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="checkout-summary__total">
                    <span>Total</span>
                    <strong>{formatINR(subtotal)}</strong>
                  </div>
                </aside>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <>
            <motion.button
              type="button"
              className="checkout-backdrop"
              aria-label="Close success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSuccess}
            />
            <motion.div
              className="order-success"
              role="dialog"
              aria-modal="true"
              aria-label="Order placed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <CheckCircle2 size={48} color="#c8f542" />
              <h2>Order placed!</h2>
              <p>
                Thanks{lastOrder?.name ? `, ${lastOrder.name}` : ""}. Your learning access is being
                prepared.
              </p>
              <p className="order-success__id">Order ID: {orderId || lastOrder?.id}</p>
              <button type="button" className="btn btn--orange" onClick={closeSuccess}>
                Keep exploring
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
