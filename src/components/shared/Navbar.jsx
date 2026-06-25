"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-properties", label: "All Properties" },
];

function Avatar({ user }) {
  if (user?.image) {
    return (
      <img
        src={user.image}
        alt={user.name || "Profile"}
        className="h-8 w-8 rounded-full object-cover border border-blueprint-line/30"
      />
    );
  }
  const initial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";
  return (
    <span className="h-8 w-8 rounded-full bg-blueprint-amber/20 border border-blueprint-amber/40 flex items-center justify-center text-xs font-mono font-semibold text-blueprint-amber">
      {initial}
    </span>
  );
}

export default function Navbar() {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      setOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-blueprint-ink border-b border-blueprint-line/15">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="h-8 w-8 rounded-sm bg-blueprint-amber/15 border border-blueprint-amber/40 flex items-center justify-center font-mono text-sm font-semibold text-blueprint-amber">
            K
          </span>
          <span className="font-display text-lg font-medium text-blueprint-paper">
            Keyspace
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-blueprint-line hover:text-blueprint-paper transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm text-blueprint-line hover:text-blueprint-paper transition-colors"
              >
                <LayoutDashboard size={15} /> Dashboard
              </Link>

              <Avatar user={user} />

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-sm font-medium bg-blueprint-amber text-blueprint-ink px-4 py-2 rounded-sm hover:bg-blueprint-amber/90 transition-colors"
              >
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-blueprint-line hover:text-blueprint-paper transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-blueprint-amber text-blueprint-ink px-4 py-2 rounded-sm hover:bg-blueprint-amber/90 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-blueprint-paper"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-blueprint-line/15 bg-blueprint-ink px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-blueprint-line hover:text-blueprint-paper"
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px bg-blueprint-line/15" />

          {user ? (
            <>
              <div className="flex items-center gap-3">
                <Avatar user={user} />
                <span className="text-sm text-blueprint-paper">{user.name || user.email}</span>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="text-sm text-blueprint-line hover:text-blueprint-paper"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-blueprint-amber text-blueprint-ink px-4 py-2 rounded-sm w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-sm text-blueprint-line hover:text-blueprint-paper"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="text-sm font-medium bg-blueprint-amber text-blueprint-ink px-4 py-2 rounded-sm w-fit"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}