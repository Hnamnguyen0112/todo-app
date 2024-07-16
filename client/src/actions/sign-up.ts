"use server";

import { http } from "@/libs/http";
import { SignUpSchema } from "@/schemas/auth";
import { z } from "zod";

export default async function signUp(values: z.infer<typeof SignUpSchema>) {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  try {
    const response = await http
      .post("auth/signup", {
        json: validatedFields.data,
      })
      .json();

    return response;
  } catch (error) {
    throw error;
  }
}
