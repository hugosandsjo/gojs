import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "@/lib/actions";
import { hashPassword } from "@/lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const email = credentials.email as string;
        const password = credentials.password as string;
        console.log("email;", email);
        console.log("password", password);
        // logic to salt and hash password
        // const pwHash = await hashPassword(password);
        // console.log("pwhash:", pwHash);
        // logic to verify if the user exists
        user = await getUserFromDb(email, password);

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }
        console.log("User from auth.ts:", user);
        // return user object with their profile data
        return user;
      },
    }),
  ],
});
