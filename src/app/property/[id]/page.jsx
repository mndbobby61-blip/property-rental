import { Suspense } from "react";
import PrivateRoute from "@/providers/PrivateRoute";
import PropertyDetailsContent from "@/components/property/PropertyDetailsContent";
import Loading from "@/components/shared/Loading";


export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;

  return (
    <PrivateRoute>
      <Suspense fallback={<Loading />}>
        <PropertyDetailsContent id={id} />
      </Suspense>
    </PrivateRoute>
  );
}