"use client";

import { useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";

const PROPERTY_TYPES = ["Any Type", "Apartment", "House", "Studio", "Room", "Office", "Land"];

export default function PropertyFilterBar({ location, type, sort, onChange }) {
  const [locationInput, setLocationInput] = useState(location || "");

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    onChange({ location: locationInput });
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <form
        onSubmit={handleLocationSubmit}
        className="flex-1 flex items-center gap-2 border border-blueprint-charcoal/15 rounded-sm px-4 py-2.5 bg-white"
      >
        <Search size={16} className="text-blueprint-slate shrink-0" />
        <input
          type="text"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          placeholder="Search by location..."
          className="w-full bg-transparent outline-none text-sm text-blueprint-charcoal placeholder:text-blueprint-slate/60"
        />
      </form>

      <select
        value={type || "Any Type"}
        onChange={(e) => onChange({ type: e.target.value === "Any Type" ? "" : e.target.value })}
        className="border border-blueprint-charcoal/15 rounded-sm px-4 py-2.5 bg-white text-sm text-blueprint-charcoal"
      >
        {PROPERTY_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2 border border-blueprint-charcoal/15 rounded-sm px-4 py-2.5 bg-white">
        <ArrowUpDown size={15} className="text-blueprint-slate shrink-0" />
        <select
          value={sort || ""}
          onChange={(e) => onChange({ sort: e.target.value })}
          className="bg-transparent outline-none text-sm text-blueprint-charcoal"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}