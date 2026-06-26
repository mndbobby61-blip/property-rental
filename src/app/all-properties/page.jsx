import { Suspense } from "react";
import AllPropertiesContent from "@/components/property/AllPropertiesContent";
import Loading from "@/components/shared/Loading";

export default function AllPropertiesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AllPropertiesContent />
    </Suspense>
  );
}