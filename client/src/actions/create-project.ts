"use server";

import { CommonResponse } from "@/interfaces/common";
import { Project } from "@/interfaces/project";
import { auth } from "@/libs/auth";
import { Env } from "@/libs/env";

interface CreateProjectProps {
  name: string;
  description: string;
}

export default async function createProject(
  props: CreateProjectProps,
): Promise<CommonResponse<Project, null>> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${Env.BACKEND_URL}/api/v1/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.sessionToken}`,
      },
      body: JSON.stringify(props),
    });

    if (!res.ok) {
      throw new Error("Failed to create project");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
