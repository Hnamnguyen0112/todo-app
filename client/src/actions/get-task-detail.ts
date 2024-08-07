"use server";

import { CommonResponse } from "@/interfaces/common";
import { Task } from "@/interfaces/task";
import { auth } from "@/libs/auth";
import { Env } from "@/libs/env";
import { notFound } from "next/navigation";

interface GetTaskDetailProps {
  projectId: string;
  taskId: string;
}

export default async function getTaskDetail({
  projectId,
  taskId,
}: GetTaskDetailProps): Promise<CommonResponse<Task, null>> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(
      `${Env.BACKEND_URL}/api/v1/projects/${projectId}/tasks/${taskId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.sessionToken}`,
        },
      },
    );

    if (!res.ok) {
      return notFound();
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
