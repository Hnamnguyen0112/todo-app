import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { http } from "./http";
import { HTTPError } from "ky";
import { LoginResponse } from "@/interfaces/auth";
import { CommonResponse } from "@/interfaces/common";
import dayjs from "dayjs";

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
          const response = (await http
            .post("auth/signin", {
              json: credentials,
            })
            .json()) as CommonResponse<LoginResponse, null>;

          if (response.data) {
            user = response.data;

            http.extend({
              headers: {
                Authorization: `Bearer ${user.access}`,
              },
            });
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
      if (!auth) {
        http.extend({
          headers: {
            Authorization: "",
          },
        });
        return false;
      }

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

      return session;
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
  },
});
