"use client";

import Link from "next/link";
import { MapPin, BedDouble, Bath, ArrowUpRight } from "lucide-react";
import useAuth from "@/hooks/useAuth";

/**
 * PropertyCard
 * -------------
 * Reused in: FeaturedProperties (home), RecentProperties (home), All Properties page.
 * Corner crop-marks (the 4 small L-shapes) only appear on hover — a quiet nod
 * to the blueprint/survey-sheet motif without overdoing it on every card.
 *
 * @param {object} property - { _id, title, location, type, price, rentType, beds, baths, image }
 * @param {string} [badge]  - optional small tag over the image, e.g. "Added 2d ago"
 */
export default function PropertyCard({ property, badge }) {
  const { user } = useAuth();
  const {
    _id,
    title,
    location,
    type,
    price,
    rentType = "Monthly",
    beds,
    baths,
    image,
  } = property;

  // Not logged in -> details link sends them to /login instead of the property page.
  const detailsHref = user ? `/property/${_id}` : `/login`;

  return (
    <div className="group relative bg-white border border-blueprint-charcoal/10 rounded-sm overflow-hidden transition-shadow hover:shadow-lg hover:shadow-blueprint-ink/5">
      {/* corner crop marks */}
      {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map(
        (pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} h-3 w-3 border-blueprint-amber opacity-0 group-hover:opacity-100 transition-opacity m-1.5 pointer-events-none`}
          />
        )
      )}

      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-blueprint-ink/90 text-blueprint-paper font-mono text-[11px] uppercase tracking-wide px-2 py-1 rounded-sm">
            {badge}
          </span>
        )}
        <span className="absolute top-3 right-3 bg-blueprint-paper/95 text-blueprint-charcoal font-mono text-[11px] uppercase tracking-wide px-2 py-1 rounded-sm">
          {type}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1.5 text-blueprint-slate text-sm mb-1">
          <MapPin size={14} />
          <span>{location}</span>
        </div>

        <h3 className="font-semibold text-blueprint-charcoal text-lg leading-snug mb-3">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-blueprint-slate text-sm mb-4">
          <span className="flex items-center gap-1">
            <BedDouble size={15} /> {beds}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={15} /> {baths}
          </span>
        </div>

        <div className="h-px bg-blueprint-charcoal/10 mb-4" />

        <div className="flex items-center justify-between">
          <p className="font-mono text-blueprint-ink font-semibold">
            ৳{Number(price).toLocaleString()}
            <span className="text-blueprint-slate text-xs font-normal">/{rentType}</span>
          </p>

          <Link
            href={detailsHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-blueprint-ink hover:text-blueprint-amber transition-colors"
          >
            View Details <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}