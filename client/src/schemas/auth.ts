import { z } from "zod";

export const SignInSchema = z.object({
  identity: z.string(),
  password: z.string().min(1),
});

export const SignUpSchema = z
  .object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    names: z.string().min(1),
    confirmPassword: z.string().min(1),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
