import getTaskDetail from "@/actions/get-task-detail";
import TaskDetail from "@/components/task/detail";
import { notFound } from "next/navigation";

interface TaskDetailProps {
  id: string;
  taskId: string;
}

export default async function TaskDetailPage({
  params,
}: {
  params: TaskDetailProps;
}) {
  const { id, taskId } = params;

  if (!id || !taskId) {
    return notFound();
  }

  const { data } = await getTaskDetail({ projectId: id, taskId });

  return (
    <div className="p-5">
      <TaskDetail task={data} />
    </div>
  );
}
