"use server";

import { auth } from "@/libs/auth";
import { Env } from "@/libs/env";

interface DeleteColumnProps {
  projectId: string;
  columnId: string;
}

export default async function deleteColumn({
  projectId,
  columnId,
}: DeleteColumnProps) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(
      `${Env.BACKEND_URL}/api/v1/projects/${projectId}/columns/${columnId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.sessionToken}`,
        },
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
