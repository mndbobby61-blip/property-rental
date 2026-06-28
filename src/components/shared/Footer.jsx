import Link from "next/link";


function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.91c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8a4 4 0 0 1 3.37 3.37Z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/all-properties", label: "All Properties" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];


function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H21.7L15.6 10.1L22.8 21H17.1L12.6 14.4L7.5 21H4.7L11.2 13.4L4.3 3H10.1L14.2 9.1L18.9 3ZM17.3 19.2H18.9L9.9 4.7H8.2L17.3 19.2Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-blueprint-ink border-t border-blueprint-line/15">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="h-8 w-8 rounded-sm bg-blueprint-amber/15 border border-blueprint-amber/40 flex items-center justify-center font-mono text-sm font-semibold text-blueprint-amber">
              K
            </span>
            <span className="font-display text-lg font-medium text-blueprint-paper">
              Keyspace
            </span>
          </div>
          <p className="text-sm text-blueprint-line leading-relaxed max-w-sm">
            A rental marketplace where every listing is reviewed before it reaches you.
            Verified owners, real photos, honest pricing.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-blueprint-paper mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-blueprint-line hover:text-blueprint-amber transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + social */}
        <div>
          <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-blueprint-paper mb-4">
            Get in Touch
          </h4>
          <p className="text-sm text-blueprint-line mb-1">support@keyspace.com</p>
          <p className="text-sm text-blueprint-line mb-5">Dhaka, Bangladesh</p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="h-9 w-9 rounded-sm border border-blueprint-line/25 flex items-center justify-center text-blueprint-line hover:text-blueprint-amber hover:border-blueprint-amber/40 transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="X"
              className="h-9 w-9 rounded-sm border border-blueprint-line/25 flex items-center justify-center text-blueprint-line hover:text-blueprint-amber hover:border-blueprint-amber/40 transition-colors"
            >
              <XIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="h-9 w-9 rounded-sm border border-blueprint-line/25 flex items-center justify-center text-blueprint-line hover:text-blueprint-amber hover:border-blueprint-amber/40 transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-blueprint-line/15">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-xs text-blueprint-line/70">
            © {new Date().getFullYear()} Keyspace. All rights reserved.
          </p>
          <p className="font-mono text-xs text-blueprint-line/70">Built for renters & owners</p>
        </div>
      </div>
    </footer>
  );
}