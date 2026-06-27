"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggle = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full border border-blueprint-line hover:bg-blueprint-paper dark:hover:bg-blueprint-charcoal transition-colors"
      title={dark ? "Switch to Light" : "Switch to Dark"}
    >
      {dark ? <Sun size={18} className="text-blueprint-amber" /> : <Moon size={18} className="text-blueprint-ink" />}
    </button>
  );
}