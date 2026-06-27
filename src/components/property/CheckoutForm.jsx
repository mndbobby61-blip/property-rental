
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { CreditCard } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const cardStyle = {
  hidePostalCode: true, // ZIP/postal বক্স বাদ দেওয়া হলো, কনফিউশন এড়াতে
  style: {
    base: {
      fontSize: "14px",
      color: "#1F2A33",
      "::placeholder": { color: "#5C7185" },
    },
    invalid: { color: "#ef4444" },
  },
};

export default function CheckoutForm({ booking, bookingId }) {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setCardError("");

    try {
      // ১. সার্ভার থেকে client secret আনা (PaymentIntent তৈরি)
      const { data } = await axiosSecure.post("/create-payment-intent", { amount: booking.amount });

      // ২. কার্ড ডিটেইলস দিয়ে পেমেন্ট confirm করা
      const card = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: booking.tenantEmail,
            name: booking.tenantName,
          },
        },
      });

      if (result.error) {
        console.error("Stripe confirmCardPayment error:", result.error);
        setCardError(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await axiosSecure.patch(`/bookings/${bookingId}/confirm-payment`, {
          transactionId: result.paymentIntent.id,
        });
        toast.success("Payment successful!");
        router.push("/payment-success");
      }
    } catch (err) {
      // ⚠️ এখন real কারণটা console-এ দেখা যাবে — কোন ধাপে fail হলো বোঝা যাবে
      console.error("Payment error:", err.response?.status, err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-blueprint-charcoal/15 rounded-sm px-3 py-3 mb-2">
        <CardElement options={cardStyle} />
      </div>

      {cardError && <p className="text-red-500 text-xs mb-3">{cardError}</p>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full flex items-center justify-center gap-2 bg-blueprint-amber text-blueprint-ink font-medium text-sm py-3 rounded-sm hover:bg-blueprint-amber/90 transition-colors disabled:opacity-60 mt-3"
      >
        <CreditCard size={16} /> {processing ? "Processing..." : "Pay Now"}
      </button>

      <p className="text-blueprint-slate text-xs text-center mt-3">
        Test card: 4242 4242 4242 4242 · any future date · any CVC
      </p>
    </form>
  );
}