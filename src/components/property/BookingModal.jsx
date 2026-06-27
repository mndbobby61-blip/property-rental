"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export default function BookingModal({ property, onClose }) {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const moveInDate = form.moveInDate.value;
    const contactNumber = form.contactNumber.value;
    const notes = form.notes.value;

    setSubmitting(true);
    try {
      const bookingData = {
        propertyId: property._id,
        propertyTitle: property.title,
        propertyImage: property.image,
        amount: property.price,
        tenantEmail: user.email,
        tenantName: user.name,
        moveInDate,
        contactNumber,
        notes,
      };

      const res = await axiosPublic.post("/bookings", bookingData);
      toast.success("Booking request submitted!");
      onClose();
      router.push(`/payment/${res.data.insertedId}`);
    } catch (err) {
      toast.error(err.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-blueprint-ink/60 flex items-center justify-center z-[100] px-4">
      <div className="bg-white rounded-sm max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blueprint-slate hover:text-blueprint-charcoal"
        >
          <X size={20} />
        </button>

        <h2 className="font-display text-xl font-medium text-blueprint-charcoal mb-1">
          Book {property.title}
        </h2>
        <p className="text-blueprint-slate text-sm mb-6">
          Fill in your details to request a booking.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Move-in Date
            </label>
            <input
              type="date"
              name="moveInDate"
              required
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              required
              placeholder="01XXXXXXXXX"
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Your Info
            </label>
            <input
              type="text"
              value={`${user?.name || ""} (${user?.email || ""})`}
              disabled
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm bg-blueprint-charcoal/5 text-blueprint-slate"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Additional Notes
            </label>
            <textarea
              name="notes"
              rows={3}
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blueprint-amber text-blueprint-ink font-medium text-sm py-3 rounded-sm hover:bg-blueprint-amber/90 transition-colors disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Confirm & Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}