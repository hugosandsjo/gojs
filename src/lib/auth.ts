import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import Resend from "next-auth/providers/resend";
// import { saltAndHashPassword } from "@/lib/utils";
import { getUserFromDb } from "@/lib/actions";
import { CredentialInput } from "next-auth/providers";

type CredentialsType = {
  email: CredentialInput;
  password: CredentialInput;
};

const providers: Provider[] = [
  Credentials<CredentialsType>({
    credentials: {
      email: { label: "Email", type: "email", placeholder: "enter email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Missing credentials");
      }

      const user = await getUserFromDb(
        credentials.email as string, // Cast to string since CredentialInput is a union type
        credentials.password as string // Cast to string since CredentialInput is a union type
      );
      console.log("User from auth.ts:", user);
      return user;
    },
  }),
  Google,
  // Resend,
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: providers,
  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
});
console.log("Providers", providers);
