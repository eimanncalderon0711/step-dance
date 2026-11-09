"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null);
const STORAGE_KEY = "stepdance-home-theme";

export default function HomeAppearance({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      // The toggle remains available when browser storage is disabled.
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Keep the preference for this visit if it cannot be persisted.
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className="home-site" data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function HomeThemeToggle() {
  const appearance = useContext(ThemeContext);
  if (!appearance) return null;

  const { theme, toggle } = appearance;
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
  return (
    <button type="button" className="home-theme-toggle" onClick={toggle} aria-label={label} title={label}>
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
