import { auth } from "@/libs/auth";

export default async function Home() {
  const session = await auth();

  if (!session?.user) return null;

  return null;
}
