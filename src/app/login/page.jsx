"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import SocialLogin from "@/components/shared/SocialLogin";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setSubmitting(true);
    try {
      await signIn(email, password);
      toast.success("Welcome back!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-blueprint-ink flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-blueprint-paper rounded-sm p-8 md:p-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-6 bg-blueprint-slate/40" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-blueprint-slate">
            Tenant / Owner Access
          </span>
        </div>

        <h1 className="font-display text-2xl md:text-3xl font-medium text-blueprint-charcoal mb-2">
          Welcome back
        </h1>
        <p className="text-blueprint-slate text-sm mb-8">
          Log in to manage your bookings, favorites, or listings.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center gap-2 border border-blueprint-charcoal/15 rounded-sm px-4 py-3">
            <Mail size={16} className="text-blueprint-slate shrink-0" />
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full bg-transparent outline-none text-sm text-blueprint-charcoal placeholder:text-blueprint-slate/60"
            />
          </div>

          <div className="flex items-center gap-2 border border-blueprint-charcoal/15 rounded-sm px-4 py-3">
            <Lock size={16} className="text-blueprint-slate shrink-0" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              minLength={6}
              placeholder="Password"
              className="w-full bg-transparent outline-none text-sm text-blueprint-charcoal placeholder:text-blueprint-slate/60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-blueprint-slate shrink-0"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blueprint-amber text-blueprint-ink font-medium text-sm py-3 rounded-sm hover:bg-blueprint-amber/90 transition-colors disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        

        <div className="flex items-center gap-3 my-6">
          <span className="h-px flex-1 bg-blueprint-charcoal/10" />
          <span className="font-mono text-xs text-blueprint-slate">OR</span>
          <span className="h-px flex-1 bg-blueprint-charcoal/10" />
        </div>

        <SocialLogin />

        <p className="text-center text-sm text-blueprint-slate mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blueprint-ink font-medium hover:text-blueprint-amber">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}