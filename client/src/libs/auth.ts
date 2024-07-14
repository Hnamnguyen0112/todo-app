import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { http } from "./http";
import { HTTPError } from "ky";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        identity: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        try {
          const response = await http
            .post("auth/signin", {
              json: credentials,
            })
            .json();

          if (response) {
            user = response;
          }

          return user;
        } catch (error) {
          if (error instanceof HTTPError) {
            throw new CredentialsSignin("CredentialsSignin", {
              cause: error.response.json(),
            });
          }

          throw new Error("Something went wrong!");
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
  },
});
