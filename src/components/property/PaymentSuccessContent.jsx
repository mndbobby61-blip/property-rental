"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loading from "../shared/Loading";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("checking"); // checking | success | failed

  useEffect(() => {
    const bookingId = searchParams.get("bookingId");
    const sessionId = searchParams.get("session_id");

    if (!bookingId || !sessionId) {
      setStatus("failed");
      return;
    }

    axiosSecure
      .get(`/verify-payment/${sessionId}`)
      .then(async (res) => {
        if (res.data.paid) {
          await axiosSecure.patch(`/bookings/${bookingId}/confirm-payment`, { transactionId: sessionId });
          setStatus("success");
        } else {
          setStatus("failed");
        }
      })
      .catch((err) => {
        console.error("Payment verification failed:", err);
        setStatus("failed");
      });
  }, [searchParams, axiosSecure]);

  if (status === "checking") return <Loading />;

  if (status === "failed") {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-blueprint-paper flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mb-6">
            <XCircle size={28} className="text-red-500" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-medium text-blueprint-charcoal mb-3">
            Payment not confirmed
          </h1>
          <p className="text-blueprint-slate text-sm mb-8">
            We couldn't confirm this payment. If you were charged, please contact support.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blueprint-amber text-blueprint-ink font-medium text-sm px-5 py-3 rounded-sm hover:bg-blueprint-amber/90 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-blueprint-paper flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mb-6">
          <CheckCircle2 size={28} className="text-green-600" />
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-medium text-blueprint-charcoal mb-3">
          Booking confirmed
        </h1>
        <p className="text-blueprint-slate text-sm mb-8">
          Your payment was successful. You can track this booking from your dashboard.
        </p>
        <Link
          href="/dashboard/tenant/my-bookings"
          className="inline-flex items-center gap-2 bg-blueprint-amber text-blueprint-ink font-medium text-sm px-5 py-3 rounded-sm hover:bg-blueprint-amber/90 transition-colors"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  );
}