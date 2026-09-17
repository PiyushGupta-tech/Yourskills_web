import { Benefits } from "../components/Benefits";
import { FloatingNav } from "../components/FloatingNav";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Impact } from "../components/Impact";
import { Products } from "../components/Products";
import { StreakCalendar } from "../components/StreakCalendar";
import { Testimonials } from "../components/Testimonials";

export function HomePage() {
  return (
    <>
      <Hero />
      <StreakCalendar />
      <Impact />
      <Benefits />
      <Products />
      <Testimonials />
      <Footer />
      <FloatingNav />
    </>
  );
}
