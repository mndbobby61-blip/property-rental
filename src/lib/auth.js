import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import clientPromise from "./db";

const client = await clientPromise;
const db = client.db("propertyRentalDB");

export const auth = betterAuth({
  // ⚠️ collectionNames override দেওয়া হলো না — Better Auth ডিফল্টভাবে
  // "user" (singular) নামে কালেকশন বানায়, যেটা তোমার server/index.js-এ
  // db.collection("user") দিয়ে এমনিতেই পড়া হচ্ছে। মিলিয়ে রাখা হলো।
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

  // ⚠️ নতুন — Express সার্ভার এই plugin-এর /jwks এন্ডপয়েন্ট দিয়ে JWT verify করবে
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