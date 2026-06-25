import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./db";

const client = await clientPromise;
const db = client.db("propertyRentalDB");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
    collectionNames: { user: "users" },
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return { data: { ...user, role: user.role || "tenant" } };
        },
      },
    },
  },

  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "tenant", input: false },
    },
  },
});