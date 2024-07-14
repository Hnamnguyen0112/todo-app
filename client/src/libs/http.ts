import ky from "ky";
import { Env } from "./env";

export const http = ky.create({
  prefixUrl: `${Env.BACKEND_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});
