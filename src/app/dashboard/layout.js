import PrivateRoute from "@/providers/PrivateRoute";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <div className="min-h-[calc(100vh-4rem)] bg-blueprint-paper flex flex-col md:flex-row">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </PrivateRoute>
  );
}