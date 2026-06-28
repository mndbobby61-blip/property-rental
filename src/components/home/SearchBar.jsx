"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Home, Search } from "lucide-react";

const PROPERTY_TYPES = ["Any Type", "Apartment", "House", "Studio", "Room", "Office", "Land"];

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type && type !== "Any Type") params.set("type", type);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);
    router.push(`/all-properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-blueprint-paper rounded-sm shadow-xl shadow-black/20 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_auto] divide-y md:divide-y-0 md:divide-x divide-blueprint-charcoal/10"
    >
      {/* Location */}
      <div className="flex items-center gap-2 px-5 py-4">
        <MapPin size={16} className="text-blueprint-slate shrink-0" />
        <input
          type="text"
          placeholder="Location, e.g. Gulshan"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-transparent outline-none text-sm text-blueprint-charcoal placeholder:text-blueprint-slate/70"
        />
      </div>

      {/* Property type */}
      <div className="flex items-center gap-2 px-5 py-4">
        <Home size={16} className="text-blueprint-slate shrink-0" />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-transparent outline-none text-sm text-blueprint-charcoal"
        >
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Min price */}
      <div className="px-5 py-4">
        <input
          type="number"
          min="0"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full bg-transparent outline-none text-sm font-mono text-blueprint-charcoal placeholder:text-blueprint-slate/70 placeholder:font-sans"
        />
      </div>

      {/* Max price */}
      <div className="px-5 py-4">
        <input
          type="number"
          min="0"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full bg-transparent outline-none text-sm font-mono text-blueprint-charcoal placeholder:text-blueprint-slate/70 placeholder:font-sans"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-blueprint-amber hover:bg-blueprint-amber/90 text-blueprint-ink font-medium text-sm px-6 py-4 transition-colors"
      >
        <Search size={16} />
        <span className="md:hidden">Search</span>
      </button>
    </form>
  );
}