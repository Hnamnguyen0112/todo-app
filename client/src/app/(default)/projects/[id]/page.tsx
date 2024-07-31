import getProjectDetail from "@/actions/get-project-detail";
import ProjectBoard from "@/components/project/detail/board";

interface ProjectDetailProps {
  id: string;
}

export default async function ProjectDetail({
  params,
}: {
  params: ProjectDetailProps;
}) {
  const { id } = params;

  if (!id) {
    return null;
  }

  const { data } = await getProjectDetail({ id });

  return (
    <main className="flex-1 max-h-full p-5">
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row mb-2">
        <h1 className="text-xl font-semibold whitespace-nowrap text-black">
          Projects / {data.name}
        </h1>
      </div>
      <ProjectBoard isCombineEnabled={false} initial={data.columns} />
    </main>
  );
}
