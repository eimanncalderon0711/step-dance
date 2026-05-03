'use client';
import Image from "next/image";


const HeroSection = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-orange-400">
        <Image src={'/images/hero-dance-2.jpg'} alt="Step dance class in action" width={1920} height={1080} priority className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-900/95 via-slate-900/80 to-slate-500/30" />
      </div>

      <div className="relative container max-w-6xl mx-auto px-4 py-20">
        <div className="max-w-xl space-y-6">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-400/90 text-primary-foreground text-xs font-semibold uppercase tracking-wider">
            Now accepting bookings
          </span>
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Dance Your Way to a{" "}
            <span className="text-orange-400">Healthier</span> Life
          </h1>
          <p className="text-white/80 text-lg max-w-md">
            Step Dance Studio offers fun, high-energy step dance sessions that keep your body moving and your spirit high. No experience needed!
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => scrollTo("#booking")}
              className="h-12 px-8 rounded-md bg-orange-400 text-primary-foreground font-semibold hover:bg-orange-400/90 transition-colors"
            >
              Book a Session
            </button>
            <button
              onClick={() => scrollTo("#about")}
              className="h-12 px-8 rounded-md bg-white/15 text-white font-semibold border border-white/30 hover:bg-white/25 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;