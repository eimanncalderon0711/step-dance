import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="home-hero">
      <div className="home-container home-hero-grid">
        <div className="home-hero-copy">
          <p className="home-eyebrow">
            <span className="home-status-dot" /> Now accepting bookings
          </p>
          <h1>
            Dance Your <br />
            Way to a <br />
            <span className="home-hero-highlight">Healthier</span> Life
            <span className="home-hero-period">.</span>
          </h1>
          <p className="home-hero-description">
            StepDance PH offers fun, high-energy step dance sessions that keep
            your body moving and your spirit high. No experience needed!
          </p>
          <div className="home-hero-actions">
            <a href="#booking" className="home-button">
              Book a Session <ArrowUpRight size={19} />
            </a>
            <a href="#about" className="home-text-link">
              Learn More <ArrowDown size={17} />
            </a>
          </div>
          <div className="home-hero-location">
            <MapPin size={15} /> Cagayan de Oro City <span /> Move at your own
            pace
          </div>
        </div>
        <div className="home-hero-visual home-hero-visual--fitness">
          <Image
            src="/images/step-workout-hero-generated.png"
            alt="Woman in black sportswear exercising on a step platform in a sunlit studio"
            fill
            sizes="(max-width: 800px) 100vw, 55vw"
            preload
            className="home-hero-photo"
          />
        </div>
      </div>
      <div className="home-ribbon" aria-hidden="true">
        <span>MOVE WITH PURPOSE</span>
        <span>✳</span>
        <span>FIND YOUR RHYTHM</span>
        <span>✳</span>
        <span>FEEL THE ENERGY</span>
        <span>✳</span>
        <span>STEP TOGETHER</span>
      </div>
    </section>
  );
}
