"use server";

import { auth } from "@/libs/auth";
import { Env } from "@/libs/env";
import { CreateTaskSchema } from "@/schemas/task";
import { z } from "zod";

interface CreateTaskProps {
  projectId: string;
  payload: z.infer<typeof CreateTaskSchema>;
}

export default async function createTask({
  projectId,
  payload,
}: CreateTaskProps) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const validatedFields = CreateTaskSchema.safeParse(payload);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  try {
    const res = await fetch(
      `${Env.BACKEND_URL}/api/v1/projects/${projectId}/tasks`,
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
      throw new Error("Failed to create task");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
