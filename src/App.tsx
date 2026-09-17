import { Benefits } from "./components/Benefits";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { FloatingNav } from "./components/FloatingNav";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Impact } from "./components/Impact";
import { Products } from "./components/Products";
import { StreakCalendar } from "./components/StreakCalendar";
import { Testimonials } from "./components/Testimonials";
import { CartProvider } from "./context/CartContext";
import "./App.css";

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <Hero />
        <StreakCalendar />
        <Impact />
        <Benefits />
        <Products />
        <Testimonials />
        <Footer />
        <FloatingNav />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
