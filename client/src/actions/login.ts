"use server";

import { CommonResponse } from "@/interfaces/common";
import { signIn } from "@/libs/auth";
import { LoginSchema } from "@/schemas/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function login(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
): Promise<CommonResponse<null, null>> {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { identity, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      identity,
      password,
      redirectTo: callbackUrl || "/",
    });

    return {
      error: null,
      message: "Success",
      code: 200,
      success: true,
      data: null,
      meta: null,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.cause?.err?.message) {
        case "CredentialsSignin":
          return (await error.cause.err.cause) as CommonResponse<null, null>;
        default:
          return {
            error: "Something went wrong",
            message: "Something went wrong",
            code: 500,
            success: false,
            data: null,
            meta: null,
          };
      }
    }

    throw error;
  }
}
