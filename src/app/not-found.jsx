import ErrorPage from "@/components/shared/ErrorPage";
export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="This page isn't on the map"
      message="The listing or page you're looking for may have moved or no longer exists."
    />
  );
}