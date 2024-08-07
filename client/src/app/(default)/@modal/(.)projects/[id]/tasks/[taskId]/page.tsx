"use client";

import getTaskDetail from "@/actions/get-task-detail";
import Modal from "@/components/modal";
import TaskDetail from "@/components/task/detail";
import { Task } from "@/interfaces/task";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskDetailModal() {
  const router = useRouter();
  const { id, taskId } = useParams();
  const [data, setData] = useState<Task>();

  function onDismiss() {
    router.back();
  }

  useEffect(() => {
    getTaskDetail({ projectId: id as string, taskId: taskId as string }).then(
      ({ data }) => {
        setData(data);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id || !taskId) {
    return notFound();
  }

  if (!data) {
    return null;
  }

  return (
    <Modal isOpen={true} setIsOpen={onDismiss} size="6xl">
      <TaskDetail task={data} />
    </Modal>
  );
}
