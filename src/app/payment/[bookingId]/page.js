"use client";

import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "@/lib/stripe";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loading from "@/components/shared/Loading";
import CheckoutForm from "@/components/property/CheckoutForm";

export default function PaymentPage({ params }) {
  const axiosSecure = useAxiosSecure();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    Promise.resolve(params).then(({ bookingId }) => {
      setBookingId(bookingId);
      axiosSecure
        .get(`/bookings/${bookingId}`)
        .then((res) => setBooking(res.data))
        .catch((err) => console.error("Failed to load booking:", err))
        .finally(() => setLoading(false));
    });
  }, [params, axiosSecure]);

  if (loading) return <Loading />;
  if (!booking) {
    return <p className="text-center py-20 text-blueprint-slate">Booking not found.</p>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-blueprint-paper flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white border border-blueprint-charcoal/10 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-6 bg-blueprint-slate/40" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-blueprint-slate">
            Booking Payment
          </span>
        </div>

        <h1 className="font-display text-2xl font-medium text-blueprint-charcoal mb-1">
          {booking.propertyTitle}
        </h1>
        <p className="text-blueprint-slate text-sm mb-6">Move-in: {booking.moveInDate}</p>

        <div className="flex items-center justify-between border-t border-b border-blueprint-charcoal/10 py-4 mb-6">
          <span className="text-sm text-blueprint-slate">Booking fee</span>
          <span className="font-mono text-xl font-semibold text-blueprint-ink">
            ৳{Number(booking.amount).toLocaleString()}
          </span>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} bookingId={bookingId} />
        </Elements>
      </div>
    </div>
  );
}