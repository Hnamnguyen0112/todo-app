"use server";

import { auth } from "@/libs/auth";
import { Env } from "@/libs/env";
import { CreateColumnSchema } from "@/schemas/column";
import { z } from "zod";

interface AddColumnProps {
  projectId: string;
  payload: z.infer<typeof CreateColumnSchema>;
}
export default async function createColumn({
  projectId,
  payload,
}: AddColumnProps) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const validatedFields = CreateColumnSchema.safeParse(payload);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  try {
    const res = await fetch(
      `${Env.BACKEND_URL}/api/v1/projects/${projectId}/add-column`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.sessionToken}`,
        },
        body: JSON.stringify(validatedFields.data),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to create project");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
