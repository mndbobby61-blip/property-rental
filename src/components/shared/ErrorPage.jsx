"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

/**
 * Reusable error / not-found display.
 *
 * Usage in app/not-found.js:
 *   import ErrorPage from "@/components/shared/ErrorPage";
 *   export default function NotFound() {
 *     return (
 *       <ErrorPage
 *         code="404"
 *         title="This page isn't on the map"
 *         message="The listing or page you're looking for may have moved or been removed."
 *       />
 *     );
 *   }
 *
 * Usage in app/error.js (must stay a Client Component, Next.js passes reset()):
 *   "use client";
 *   import ErrorPage from "@/components/shared/ErrorPage";
 *   export default function Error({ error, reset }) {
 *     return (
 *       <ErrorPage
 *         code="500"
 *         title="Something broke on our end"
 *         message="Try again — if it keeps happening, the team's already been notified."
 *         onRetry={reset}
 *       />
 *     );
 *   }
 */
export default function ErrorPage({
  code = "404",
  title = "This page isn't on the map",
  message = "The page you're looking for may have moved or no longer exists.",
  onRetry,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blueprint-paper px-6">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-sm bg-blueprint-amber/15 border border-blueprint-amber/30 mb-6">
          <AlertTriangle size={24} className="text-blueprint-amber" />
        </div>

        <p className="font-mono text-xs tracking-[0.2em] uppercase text-blueprint-slate mb-3">
          Error {code}
        </p>

        <h1 className="font-display text-2xl md:text-3xl font-medium text-blueprint-charcoal mb-3">
          {title}
        </h1>

        <p className="text-blueprint-slate text-sm leading-relaxed mb-8">{message}</p>

        <div className="flex items-center justify-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 text-sm font-medium border border-blueprint-charcoal/15 text-blueprint-charcoal px-4 py-2.5 rounded-sm hover:bg-blueprint-charcoal/5 transition-colors"
            >
              <RefreshCw size={15} /> Try again
            </button>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium bg-blueprint-amber text-blueprint-ink px-4 py-2.5 rounded-sm hover:bg-blueprint-amber/90 transition-colors"
          >
            <Home size={15} /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}