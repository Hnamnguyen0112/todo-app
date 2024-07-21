import CreateProject from "@/components/project/create";

export default async function Project() {
  return (
    <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
        <h1 className="text-xl font-semibold whitespace-nowrap">
          Create Project
        </h1>
      </div>
      <CreateProject />
    </main>
  );
}
