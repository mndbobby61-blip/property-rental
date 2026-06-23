"use client";

import Link from "next/link";
import SectionTitle from "../shared/SectionTitle";

/**
 * Extra Section #1 — Top Locations
 * TEMP MOCK DATA — পরে backend থেকে আসবে:
 *   const res = await axiosPublic.get("/properties/top-locations");
 * (server-side aggregation: group by location, count listings)
 */
const locations = [
  { name: "Gulshan", count: 24, image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600" },
  { name: "Banani", count: 18, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600" },
  { name: "Bashundhara R/A", count: 31, image: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=600" },
  { name: "Uttara", count: 22, image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=600" },
];

export default function TopLocations() {
  return (
    <section className="bg-blueprint-paper py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="WHERE PEOPLE ARE LOOKING" title="Top locations right now" />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5">
          {locations.map((loc) => (
            <Link
              key={loc.name}
              href={`/all-properties?location=${encodeURIComponent(loc.name)}`}
              className="group relative aspect-[3/4] rounded-sm overflow-hidden block"
            >
              <img
                src={loc.image}
                alt={loc.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blueprint-ink/90 via-blueprint-ink/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-blueprint-paper font-medium">{loc.name}</p>
                <p className="font-mono text-xs text-blueprint-line uppercase tracking-wide mt-0.5">
                  {loc.count} Listings
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}