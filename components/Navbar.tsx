"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { HomeThemeToggle } from "@/components/HomeAppearance";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Booking", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="home-nav">
      <nav className="home-container home-nav-inner" aria-label="Main navigation">
        <a href="#home" className="home-brand" onClick={() => setOpen(false)}>
          <Image src="/images/step-dance-logo.png" alt="StepDance PH logo" width={48} height={48} />
          <span>StepDance<span className="home-brand-accent"> PH</span></span>
        </a>
        <ul className="home-desktop-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>
        <div className="home-nav-actions">
        <HomeThemeToggle />
        <a href="#booking" className="home-button home-nav-cta">Book a session <ArrowUpRight size={16} /></a>
        <button
          type="button"
          className="home-menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="home-mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        </div>
      </nav>
      {open && (
        <nav id="home-mobile-nav" className="home-mobile-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={16} /></a>
          ))}
        </nav>
      )}
    </header>
  );
}
