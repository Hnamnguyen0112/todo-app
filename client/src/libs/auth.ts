import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { HTTPError } from "ky";
import { LoginResponse } from "@/interfaces/auth";
import { CommonResponse } from "@/interfaces/common";
import dayjs from "dayjs";
import { Env } from "./env";

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
          await fetch(`${Env.BACKEND_URL}/api/v1/auth/signin`, {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identity: credentials.identity,
              password: credentials.password,
            }),
            method: "POST",
          }).then(async (res) => {
            if (res.ok) {
              const json = (await res.json()) as CommonResponse<
                LoginResponse,
                null
              >;
              user = json.data;
            }
          });

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
      if (dayjs(auth?.expires).isBefore(dayjs())) {
        return false;
      }

      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.access = user.access;
        token.accessExp = user.accessExp;
        token.refresh = user.refresh;
        token.refreshExp = user.refreshExp;
        token.user = user.user;

        return token;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.user.id;
      session.user.email = token.user.email;
      session.user.name = token.user.names;
      session.expires = dayjs.unix(token.accessExp).toISOString() as any;
      session.sessionToken = token.access;

      return session;
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
  },
});
