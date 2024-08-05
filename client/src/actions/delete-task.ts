"use server";

import { auth } from "@/libs/auth";
import { Env } from "@/libs/env";
import { DeleteTaskSchema } from "@/schemas/task";
import { z } from "zod";

interface DeleteTaskProps {
  projectId: string;
  taskId: string;
  payload: z.infer<typeof DeleteTaskSchema>;
}

export default async function deleteTask({
  projectId,
  taskId,
  payload,
}: DeleteTaskProps) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const validatedFields = DeleteTaskSchema.safeParse(payload);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  try {
    const res = await fetch(
      `${Env.BACKEND_URL}/api/v1/projects/${projectId}/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.sessionToken}`,
        },
        body: JSON.stringify(validatedFields.data),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to delete task");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
