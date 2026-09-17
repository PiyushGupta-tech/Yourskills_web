import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatINR } from "../data/courses";
import { useCart } from "../context/CartContext";
import "./CartDrawer.css";

export function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQty,
    subtotal,
    count,
  } = useCart();

  const goPlaceOrder = () => {
    closeCart();
    navigate("/place-order");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            type="button"
            className="cart-backdrop"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <header className="cart-drawer__head">
              <div>
                <h2>Your cart</h2>
                <p>{count} item{count === 1 ? "" : "s"}</p>
              </div>
              <button type="button" className="cart-icon-btn" onClick={closeCart} aria-label="Close">
                <X size={20} />
              </button>
            </header>

            <div className="cart-drawer__body">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={36} />
                  <p>Your cart is empty</p>
                  <button type="button" className="btn btn--orange" onClick={closeCart}>
                    Browse courses
                  </button>
                </div>
              ) : (
                <ul className="cart-list">
                  {items.map((item) => (
                    <li key={item.id} className="cart-item">
                      <div>
                        <strong>{item.title}</strong>
                        <small>
                          {item.kind === "membership" ? "Membership" : item.category}
                        </small>
                        <p>{formatINR(item.price)}</p>
                      </div>
                      <div className="cart-item__actions">
                        {item.kind === "course" && (
                          <div className="cart-qty">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span>{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        )}
                        <button
                          type="button"
                          className="cart-icon-btn"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="cart-drawer__foot">
                <div className="cart-total">
                  <span>Subtotal</span>
                  <strong>{formatINR(subtotal)}</strong>
                </div>
                <button type="button" className="btn btn--orange cart-checkout-btn" onClick={goPlaceOrder}>
                  Place order
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
