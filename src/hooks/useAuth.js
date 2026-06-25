"use client";

import { authClient } from "@/lib/auth-client";

export default function useAuth() {
  const { data, isPending } = authClient.useSession();

  return {
    user: data?.user || null,
    loading: isPending,
    signIn: (email, password) => authClient.signIn.email({ email, password }),
    createUser: (email, password, name, photo) =>
      authClient.signUp.email({ email, password, name, image: photo }),
    googleSignIn: () => authClient.signIn.social({ provider: "google", callbackURL: "/" }),
    logOut: () => authClient.signOut(),
  };
}