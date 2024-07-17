"use server";

import { signOut as signOutNextAuth } from "@/libs/auth";

export default async function signOut(formData: FormData): Promise<void> {
  await signOutNextAuth({ redirectTo: "/auth" });
}
