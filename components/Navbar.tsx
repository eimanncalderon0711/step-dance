'use client';
import { Footprints, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";


const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Booking", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-slate-700 backdrop-blur-sm transition-colors duration-300 ${
        scrolled
          ? "bg-slate-900/80" // darker slate with 80% opacity when scrolled
          : "bg-slate-900/10 backdrop:bg-amber-700" // original
      }`}
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-20 px-4">
        <button onClick={() => scrollTo("#home")} className="flex items-center gap-2.5">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
            {/* <Footprints className="w-4.5 h-4.5 text-primary-foreground" /> */}
            <Image src="/images/step-dance-logo.png" alt="Step Dance Logo" width={64} height={64} />
          </div>
          <span className="font-bold text-lg text-orange-400">Step Dance PH</span>
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className="px-4 py-2 rounded-md text-base font-medium text-muted-foreground cursor-pointer hover:text-foreground hover:bg-orange-400 transition-colors"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-slate-900 px-4 pb-4">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="block w-full text-left py-3 text-sm font-medium text-white hover:text-foreground transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;