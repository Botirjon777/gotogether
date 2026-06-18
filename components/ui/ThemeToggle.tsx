"use client";

import { useEffect, useState } from "react";

import { Icon } from "./Icons";

type Theme = "light" | "dark";

/**
 * Toggles the `light`/`dark` class on <html> and persists the choice.
 * The initial class is set before paint by the no-flash script in the layout;
 * this component just reads it back on mount and flips it on click.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("light") ? "light" : "dark",
    );
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`grid size-9 place-items-center rounded-lg border border-line text-snow transition-colors hover:border-cobalt/60 ${className}`}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
    </button>
  );
}
