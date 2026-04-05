import About from "@/components/About";
import BookingForm from "@/components/BookingForm";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

;

const features = [
  { title: "Feature One", description: "Explain the first amazing feature." },
  { title: "Feature Two", description: "Explain the second amazing feature." },
  { title: "Feature Three", description: "Explain the third amazing feature." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Hero />
      <About />
      {/* Booking Section */}
      <section id="booking" className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">Reserve Your Spot</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Book a Session</h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              No account needed — simply fill in your details, enter your payment reference, and upload your proof of payment.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>

      <ContactSection />
      {/* Static Map */}
      <footer className="py-12 text-center text-white">
        <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
      </footer>
    </div>
  );
}