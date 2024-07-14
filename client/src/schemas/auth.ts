import { z } from "zod";

export const LoginSchema = z.object({
  identity: z.string(),
  password: z.string().min(1),
});
