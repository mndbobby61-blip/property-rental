"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/Loading";


export default function DashboardIndexPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || !user) return;

    if (user.role === "owner") {
      router.replace("/dashboard/owner");
    } else if (user.role === "admin") {
      router.replace("/dashboard/admin/all-users");
    } else {
      router.replace("/dashboard/tenant/my-bookings");
    }
  }, [user, loading, router]);

  return <Loading />;
}