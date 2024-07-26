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

  const initial = {
    "column-1": [
      { id: "task-1", content: "Take out the garbage" },
      { id: "task-2", content: "Watch my favorite show" },
      { id: "task-3", content: "Charge my phone" },
      { id: "task-4", content: "Cook dinner" },
    ],
    "column-2": [
      { id: "task-5", content: "Go to the gym" },
      { id: "task-6", content: "Read a book" },
      { id: "task-7", content: "Code" },
    ],
    "column-3": [
      { id: "task-8", content: "Go to the gym" },
      { id: "task-9", content: "Read a book" },
      { id: "task-10", content: "Code" },
    ],
    "column-4": [
      { id: "task-11", content: "Go to the gym" },
      { id: "task-12", content: "Read a book" },
      { id: "task-13", content: "Code" },
    ],
    "add-column": [],
  };

  return (
    <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row mb-2">
        <h1 className="text-xl font-semibold whitespace-nowrap text-black">
          Projects / {data.name}
        </h1>
      </div>
      <ProjectBoard
        isCombineEnabled={false}
        initial={initial}
        columns={data.columns}
      />
    </main>
  );
}
