import { Suspense } from "react";
import PrivateRoute from "@/providers/PrivateRoute";
import PropertyDetailsContent from "@/components/property/PropertyDetailsContent";
import Loading from "@/components/shared/Loading";

/**
 * Next.js 15+/16-এ params এখন Promise — তাই await করা লাগে।
 * পুরনো ভার্সনে params সরাসরি object ছিল, এখন async।
 */
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