"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/Loading";

/**
 * /dashboard-এ সরাসরি কোনো content নেই — এটা শুধু role দেখে ঠিক জায়গায় পাঠিয়ে দেয়।
 * Navbar-এর "Dashboard" লিংক সবসময় /dashboard-এ যায়, এখান থেকেই বাকিটা ঠিক হয়।
 *
 * ⚠️ owner/admin-এর জন্য /dashboard/owner ও /dashboard/admin/all-users এখনো বানানো হয়নি —
 * সেই দুটো role-এর জন্য আপাতত 404 আসবে, এটা পরের ধাপে ঠিক হবে। tenant role-এর জন্য কাজ করবে।
 */
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