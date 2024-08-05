"use server";

import { auth } from "@/libs/auth";
import { Env } from "@/libs/env";
import { UpdateColumnSchema } from "@/schemas/column";
import { z } from "zod";

interface UpdateColumnProps {
  projectId: string;
  columnId: string;
  payload: z.infer<typeof UpdateColumnSchema>;
}

export default async function updateColumn({
  projectId,
  columnId,
  payload,
}: UpdateColumnProps) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const validatedFields = UpdateColumnSchema.safeParse(payload);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  try {
    const res = await fetch(
      `${Env.BACKEND_URL}/api/v1/projects/${projectId}/columns/${columnId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.sessionToken}`,
        },
        body: JSON.stringify(validatedFields.data),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to update column");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
