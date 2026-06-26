"use client";

import { useEffect, useState } from "react";
import { Toaster as SonnerToaster } from "sonner";

type Theme = "light" | "dark";

/**
 * Sonner toaster wired to the project's theme. The theme lives as a `light`/
 * `dark` class on <html> (toggled by ThemeToggle), so we mirror it here and
 * keep it in sync via a MutationObserver rather than relying on `system`.
 */
export function Toaster() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setTheme(root.classList.contains("light") ? "light" : "dark");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <SonnerToaster
      theme={theme}
      position="bottom-right"
      richColors
      closeButton
    />
  );
}
