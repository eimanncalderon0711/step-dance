import About from "@/components/About";
import BookingForm from "@/components/BookingForm";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/HeroSection";
import HomeAppearance from "@/components/HomeAppearance";
import Navbar from "@/components/Navbar";
import { ArrowUpRight, CalendarDays, CreditCard, Sparkles } from "lucide-react";
import "./home.css";

export default function HomePage() {
  return (
    <HomeAppearance>
      <a href="#main-content" className="home-skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <section id="booking" className="home-booking home-section">
          <div className="home-container home-booking-layout">
            <div className="home-booking-intro">
              <p className="home-eyebrow">Reserve Your Spot</p>
              <h2 className="home-section-title">Book a<br /><span>Session.</span></h2>
              <p className="home-body-copy">
                No account needed — simply fill in your details, enter your payment reference, and upload your proof of payment.
              </p>
              <ol className="home-booking-steps">
                <li><CalendarDays /><div><span>01 / Choose your session</span><p>Pick a date and an available time slot.</p></div></li>
                <li><CreditCard /><div><span>02 / Add your payment details</span><p>Enter your reference and upload your proof of payment.</p></div></li>
                <li><Sparkles /><div><span>03 / Make your next move</span><p>Confirm your booking and get ready to dance.</p></div></li>
              </ol>
              <a href="#contact" className="home-text-link">Have a question? Get in touch <ArrowUpRight size={17} /></a>
            </div>
            <div className="home-booking-form"><BookingForm /></div>
          </div>
        </section>
        <ContactSection />
      </main>
      <footer className="home-footer">
        <div className="home-container home-footer-inner">
          <a href="#home" className="home-brand">StepDance<span className="home-brand-accent">PH</span></a>
          <p>&copy; {new Date().getFullYear()} StepDance PH. All rights reserved.</p>
          <a href="#home" className="home-text-link">Back to top <ArrowUpRight size={16} /></a>
        </div>
      </footer>
    </HomeAppearance>
  );
}
