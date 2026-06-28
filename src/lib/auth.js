import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import clientPromise from "./db";

const client = await clientPromise;
const db = client.db("propertyRentalDB");

export const auth = betterAuth({
  
  database: mongodbAdapter(db, { client }),

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

  
  plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          role: user.role,
        }),
        expirationTime: "1h",
      },
    }),
  ],
});