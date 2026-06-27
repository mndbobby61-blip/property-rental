"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CreditCard } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loading from "@/components/shared/Loading";

export default function PaymentPage({ params }) {
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
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

  const handlePay = async () => {
    setPaying(true);
    try {
      await axiosSecure.patch(`/bookings/${bookingId}/confirm-payment`);
      toast.success("Payment successful!");
      router.push("/payment-success");
    } catch (err) {
      toast.error("Payment failed");
    } finally {
      setPaying(false);
    }
  };

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

        <button
          onClick={handlePay}
          disabled={paying}
          className="w-full flex items-center justify-center gap-2 bg-blueprint-amber text-blueprint-ink font-medium text-sm py-3 rounded-sm hover:bg-blueprint-amber/90 transition-colors disabled:opacity-60"
        >
          <CreditCard size={16} /> {paying ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}