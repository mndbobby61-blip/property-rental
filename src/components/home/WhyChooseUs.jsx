"use client";

import { ShieldCheck, CreditCard, MessageCircle, LayoutDashboard } from "lucide-react";
import SectionTitle from "../shared/SectionTitle";

const benefits = [
  {
    icon: ShieldCheck,
    label: "Verified listings",
    description:
      "Every property is checked by our team before it goes live — no fake photos, no guessing on the rent.",
  },
  {
    icon: CreditCard,
    label: "Secure payments",
    description:
      "Booking fees are processed through Stripe, so your card details never touch our servers.",
  },
  {
    icon: MessageCircle,
    label: "Direct owner contact",
    description:
      "Once a booking is confirmed, you deal with the property owner directly — no middleman markups.",
  },
  {
    icon: LayoutDashboard,
    label: "One dashboard for everything",
    description:
      "Track bookings, favorites, and payments from a single dashboard, whether you're renting or listing.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-blueprint-paper py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          eyebrow="HOW IT WORKS"
          title="Built so nothing gets lost in translation"
          description="A short legend for what makes Keyspace different from a regular listings board."
        />

        {/* legend / key panel — mirrors the symbol-key printed on a blueprint sheet */}
        <div className="mt-12 bg-blueprint-ink rounded-sm overflow-hidden divide-y divide-blueprint-line/15 md:divide-y-0 md:grid md:grid-cols-2">
          {benefits.map(({ icon: Icon, label, description }, i) => (
            <div
              key={label}
              className={`flex gap-4 p-7 md:p-8 ${
                i % 2 === 0 ? "md:border-r border-blueprint-line/15" : ""
              } ${i < 2 ? "md:border-b border-blueprint-line/15" : ""}`}
            >
              <div className="shrink-0 h-10 w-10 rounded-sm bg-blueprint-amber/15 border border-blueprint-amber/30 flex items-center justify-center">
                <Icon size={18} className="text-blueprint-amber" />
              </div>
              <div>
                <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-blueprint-paper mb-2">
                  {label}
                </h3>
                <p className="text-blueprint-line text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}