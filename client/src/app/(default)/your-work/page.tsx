import YourWorkProjects from "@/components/your-work/projects";
import Link from "next/link";

export default async function YourWork() {
  return (
    <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
        <h1 className="text-xl font-semibold whitespace-nowrap">
          Recent Projects
        </h1>
        <Link
          href="/projects"
          className="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-primary-500 rounded-md"
        >
          Create Project
        </Link>
      </div>
      <YourWorkProjects />
    </main>
  );
}
