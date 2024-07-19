"use server";

import { Env } from "@/libs/env";
import { SignUpSchema } from "@/schemas/auth";
import { z } from "zod";

export default async function signUp(values: z.infer<typeof SignUpSchema>) {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  try {
    return fetch(`${Env.BACKEND_URL}/api/v1/auth/signup`, {
      body: JSON.stringify(validatedFields.data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  } catch (error) {
    throw error;
  }
}
