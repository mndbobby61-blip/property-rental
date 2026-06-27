import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
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