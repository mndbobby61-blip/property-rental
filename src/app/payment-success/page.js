
import { Suspense } from "react";
import PaymentSuccessContent from "@/components/property/PaymentSuccessContent";
import Loading from "@/components/shared/Loading";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}