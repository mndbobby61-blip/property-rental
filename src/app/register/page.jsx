"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { User, Mail, Image as ImageIcon, Lock, Eye, EyeOff } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import SocialLogin from "@/components/shared/SocialLogin";

export default function RegisterPage() {
  const { createUser } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!/(?=.*[A-Z])/.test(password) || password.length < 6) {
      toast.error("Password needs an uppercase letter and at least 6 characters");
      return;
    }

    setSubmitting(true);
    try {
      await createUser(email, password, name, photo);
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
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
            New Tenant Registration
          </span>
        </div>

        <h1 className="font-display text-2xl md:text-3xl font-medium text-blueprint-charcoal mb-2">
          Create your account
        </h1>
        <p className="text-blueprint-slate text-sm mb-8">
          Start saving favorites and booking places to stay.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex items-center gap-2 border border-blueprint-charcoal/15 rounded-sm px-4 py-3">
            <User size={16} className="text-blueprint-slate shrink-0" />
            <input
              type="text"
              name="name"
              required
              placeholder="Full name"
              className="w-full bg-transparent outline-none text-sm text-blueprint-charcoal placeholder:text-blueprint-slate/60"
            />
          </div>

          <div className="flex items-center gap-2 border border-blueprint-charcoal/15 rounded-sm px-4 py-3">
            <ImageIcon size={16} className="text-blueprint-slate shrink-0" />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL (imgbb link)"
              className="w-full bg-transparent outline-none text-sm text-blueprint-charcoal placeholder:text-blueprint-slate/60"
            />
          </div>

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
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* STAGE B-তে এখানে <SocialLogin /> যুক্ত হবে */}

        <div className="flex items-center gap-3 my-6">
          <span className="h-px flex-1 bg-blueprint-charcoal/10" />
          <span className="font-mono text-xs text-blueprint-slate">OR</span>
          <span className="h-px flex-1 bg-blueprint-charcoal/10" />
        </div>

        <SocialLogin />

        <p className="text-center text-sm text-blueprint-slate mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blueprint-ink font-medium hover:text-blueprint-amber">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}