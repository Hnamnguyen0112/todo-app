"use server";

import { CommonResponse } from "@/interfaces/common";
import { Project } from "@/interfaces/project";
import { auth } from "@/libs/auth";
import { Env } from "@/libs/env";

export default async function getProjectList(): Promise<
  CommonResponse<Project[], null>
> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }
  try {
    const res = await fetch(`${Env.BACKEND_URL}/api/v1/projects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.sessionToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
