"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const PROPERTY_TYPES = ["Apartment", "House", "Studio", "Room", "Office", "Land"];
const RENT_TYPES = ["Monthly", "Weekly", "Daily"];

export default function AddPropertyPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const amenities = form.amenities.value
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    const propertyData = {
      title: form.title.value,
      description: form.description.value,
      location: form.location.value,
      type: form.type.value,
      price: Number(form.price.value),
      rentType: form.rentType.value,
      beds: Number(form.beds.value),
      baths: Number(form.baths.value),
      size: Number(form.size.value),
      amenities,
      image: form.image.value,
      extraFeatures: form.extraFeatures.value,
      ownerEmail: user.email,
      ownerName: user.name,
    };

    setSubmitting(true);
    try {
      await axiosSecure.post("/properties", propertyData);
      toast.success("Property submitted for approval!");
      router.push("/dashboard/owner/my-properties");
    } catch (err) {
      toast.error("Failed to add property");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-blueprint-charcoal mb-2">Add Property</h1>
      <p className="text-blueprint-slate text-sm mb-6">
        New listings start as <span className="font-mono">pending</span> until an admin approves them.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-blueprint-charcoal/10 rounded-sm p-6 max-w-3xl space-y-5"
      >
        <div>
          <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
            Property Title
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            required
            className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Property Type
            </label>
            <select
              name="type"
              required
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Rent (Price)
            </label>
            <input
              type="number"
              name="price"
              required
              min="0"
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Rent Type
            </label>
            <select
              name="rentType"
              required
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            >
              {RENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Bedrooms
            </label>
            <input
              type="number"
              name="beds"
              required
              min="0"
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Bathrooms
            </label>
            <input
              type="number"
              name="baths"
              required
              min="0"
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Size (sqft)
            </label>
            <input
              type="number"
              name="size"
              min="0"
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
            Amenities (comma separated)
          </label>
          <input
            type="text"
            name="amenities"
            placeholder="Parking, Generator, Lift"
            className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            required
            placeholder="https://..."
            className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
            Extra Features
          </label>
          <textarea
            name="extraFeatures"
            rows={2}
            className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blueprint-amber text-blueprint-ink font-medium text-sm px-6 py-3 rounded-sm hover:bg-blueprint-amber/90 transition-colors disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Property"}
        </button>
      </form>
    </div>
  );
}