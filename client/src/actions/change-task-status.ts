"use server";

import { auth } from "@/libs/auth";
import { Env } from "@/libs/env";
import { ChangeTaskStatusSchema } from "@/schemas/task";
import { z } from "zod";

interface UpdateTaskProps {
  projectId: string;
  taskId: string;
  payload: z.infer<typeof ChangeTaskStatusSchema>;
}
export default async function changeTaskStatus({
  projectId,
  taskId,
  payload,
}: UpdateTaskProps) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const validatedFields = ChangeTaskStatusSchema.safeParse(payload);
  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }
  try {
    const res = await fetch(
      `${Env.BACKEND_URL}/api/v1/projects/${projectId}/tasks/${taskId}/status`,
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
      throw new Error("Failed to update task");
    }
    return res.json();
  } catch (error) {
    throw error;
  }
}
