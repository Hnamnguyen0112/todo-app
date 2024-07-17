"use server";

import { CommonResponse } from "@/interfaces/common";
import { signIn as nextAuthSignIn } from "@/libs/auth";
import { SignInSchema } from "@/schemas/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

export default async function signIn(
  values: z.infer<typeof SignInSchema>,
  callbackUrl?: string | null,
): Promise<CommonResponse<null, null>> {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { identity, password } = validatedFields.data;

  try {
    await nextAuthSignIn("credentials", {
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
