import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/Login";
import { PlaceOrderPage } from "./pages/PlaceOrder";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import "./App.css";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <ScrollManager />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/place-order" element={<PlaceOrderPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <CartDrawer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
