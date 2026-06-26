"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MapPin, BedDouble, Bath, Maximize, Heart, CalendarCheck } from "lucide-react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loading from "../shared/Loading";
import ErrorPage from "../shared/ErrorPage";

export default function PropertyDetailsContent({ id }) {
  const axiosPublic = useAxiosPublic();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => {
        console.error("Failed to load property:", err.response?.status, err.response?.data || err.message);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id, axiosPublic]);

  if (loading) return <Loading />;

  if (error || !property) {
    return (
      <ErrorPage
        code="404"
        title="Property not found"
        message="This listing may have been removed, or the link is incorrect."
      />
    );
  }

  // ⚠️ পরের sub-step-গুলোতে এই দুটো বাটন real কাজ করবে (Favorites + Booking Modal)
  const handleBookClick = () => toast("Booking modal আসছে পরের sub-step-এ (6C)");
  const handleFavoriteClick = () => toast("Add to Favorites আসছে পরের sub-step-এ (6B)");

  return (
    <div className="bg-blueprint-paper min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative aspect-[16/9] rounded-sm overflow-hidden mb-8">
          <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
          <span className="absolute top-4 right-4 bg-blueprint-paper/95 text-blueprint-charcoal font-mono text-xs uppercase tracking-wide px-3 py-1.5 rounded-sm">
            {property.type}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10">
          {/* Left: details */}
          <div>
            <div className="flex items-center gap-1.5 text-blueprint-slate text-sm mb-2">
              <MapPin size={15} />
              <span>{property.location}</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-medium text-blueprint-charcoal mb-4">
              {property.title}
            </h1>

            <div className="flex items-center gap-6 text-blueprint-slate text-sm mb-6 pb-6 border-b border-blueprint-charcoal/10">
              <span className="flex items-center gap-1.5">
                <BedDouble size={16} /> {property.beds} Beds
              </span>
              <span className="flex items-center gap-1.5">
                <Bath size={16} /> {property.baths} Baths
              </span>
              {property.size && (
                <span className="flex items-center gap-1.5">
                  <Maximize size={16} /> {property.size} sqft
                </span>
              )}
            </div>

            <h2 className="font-mono text-xs tracking-[0.15em] uppercase text-blueprint-slate mb-3">
              Description
            </h2>
            <p className="text-blueprint-charcoal text-sm leading-relaxed mb-8">
              {property.description || "No description provided."}
            </p>

            {property.amenities?.length > 0 && (
              <>
                <h2 className="font-mono text-xs tracking-[0.15em] uppercase text-blueprint-slate mb-3">
                  Amenities
                </h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {property.amenities.map((a) => (
                    <span
                      key={a}
                      className="text-xs font-mono bg-blueprint-charcoal/5 text-blueprint-charcoal px-3 py-1.5 rounded-sm"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: price + actions */}
          <div className="lg:sticky lg:top-24 h-fit border border-blueprint-charcoal/10 rounded-sm p-6 bg-white">
            <p className="font-mono text-2xl text-blueprint-ink font-semibold mb-1">
              ৳{Number(property.price).toLocaleString()}
              <span className="text-blueprint-slate text-sm font-normal">/{property.rentType}</span>
            </p>
            <p className="text-blueprint-slate text-xs mb-6">Booking fee charged via Stripe</p>

            <button
              onClick={handleBookClick}
              className="w-full flex items-center justify-center gap-2 bg-blueprint-amber text-blueprint-ink font-medium text-sm py-3 rounded-sm hover:bg-blueprint-amber/90 transition-colors mb-3"
            >
              <CalendarCheck size={16} /> Book Property
            </button>

            <button
              onClick={handleFavoriteClick}
              className="w-full flex items-center justify-center gap-2 border border-blueprint-charcoal/15 text-blueprint-charcoal font-medium text-sm py-3 rounded-sm hover:bg-blueprint-charcoal/5 transition-colors"
            >
              <Heart size={16} /> Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}