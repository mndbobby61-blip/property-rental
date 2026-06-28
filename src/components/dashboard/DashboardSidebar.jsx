"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  Heart,
  User,
  LayoutDashboard,
  PlusSquare,
  Building2,
  ClipboardList,
  Users,
  Receipt,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

const tenantLinks = [
  { href: "/dashboard/tenant/my-bookings", label: "My Bookings", icon: CalendarCheck },
  { href: "/dashboard/tenant/favorites", label: "Favorites", icon: Heart },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

const ownerLinks = [
  { href: "/dashboard/owner", label: "Dashboard Home", icon: LayoutDashboard },
  { href: "/dashboard/owner/add-property", label: "Add Property", icon: PlusSquare },
  { href: "/dashboard/owner/my-properties", label: "My Properties", icon: Building2 },
  { href: "/dashboard/owner/booking-requests", label: "Booking Requests", icon: ClipboardList },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

const adminLinks = [
  { href: "/dashboard/admin/all-users", label: "All Users", icon: Users },
  { href: "/dashboard/admin/all-properties", label: "All Properties", icon: Building2 },
  { href: "/dashboard/admin/all-bookings", label: "All Bookings", icon: ClipboardList },
  { href: "/dashboard/admin/transactions", label: "Transactions", icon: Receipt },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export default function DashboardSidebar() {
  
  const { user } = useAuth();
  const pathname = usePathname();

  const links = user?.role === "owner" ? ownerLinks : user?.role === "admin" ? adminLinks : tenantLinks;

  return (
    <aside className="w-full md:w-64 bg-blueprint-ink md:min-h-[calc(100vh-4rem)] p-4 md:p-6">
      <p className="font-mono text-xs uppercase tracking-wide text-blueprint-line/70 mb-4 px-2">
        {user?.role || "tenant"} dashboard
      </p>
      <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm whitespace-nowrap transition-colors ${
                active
                  ? "bg-blueprint-amber text-blueprint-ink font-medium"
                  : "text-blueprint-line hover:bg-blueprint-line/10"
              }`}
            >
              <Icon size={16} /> {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}