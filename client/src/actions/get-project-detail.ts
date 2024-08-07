"use server";

import { CommonResponse } from "@/interfaces/common";
import { Project } from "@/interfaces/project";
import { auth } from "@/libs/auth";
import { Env } from "@/libs/env";
import { notFound } from "next/navigation";

interface GetProjectDetailProps {
  id: string;
}

export default async function ProjectDetail({
  id,
}: GetProjectDetailProps): Promise<CommonResponse<Project, null>> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${Env.BACKEND_URL}/api/v1/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.sessionToken}`,
      },
    });

    if (!res.ok) {
      return notFound();
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
