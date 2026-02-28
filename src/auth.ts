import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getEnv } from "@/lib/env";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: Partial<Record<"email" | "password", unknown>>) => {
        const env = getEnv();
        const email = typeof credentials?.email === "string" ? credentials.email : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) {
          return null;
        }

        const isValidEmail = email.toLowerCase().trim() === env.ADMIN_EMAIL.toLowerCase().trim();
        const isValidPassword = password === env.ADMIN_PASSWORD;

        if (!isValidEmail || !isValidPassword) {
          return null;
        }

        return {
          id: "admin-user",
          email: env.ADMIN_EMAIL,
          name: "Felsen Admin",
          role: "admin",
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
