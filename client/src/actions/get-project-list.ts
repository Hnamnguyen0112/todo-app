"use server";

import {
  CommonResponse,
  PaginationMeta,
  PaginationRequest,
} from "@/interfaces/common";
import { Project } from "@/interfaces/project";
import { auth } from "@/libs/auth";
import { Env } from "@/libs/env";

export default async function getProjectList(
  props: PaginationRequest,
): Promise<CommonResponse<Project[], PaginationMeta>> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const { page, limit, keyword } = props;
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    keyword,
  });

  try {
    const res = await fetch(`${Env.BACKEND_URL}/api/v1/projects?${query}`, {
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
