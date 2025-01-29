"use client";

import updateTask from "@/actions/update-task";
import toast from "@/components/toast";
import { Task } from "@/interfaces/task";
import { UpdateTaskSchema } from "@/schemas/task";
import {
  LinkIcon,
  PaperClipIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { useDebounce } from "@uidotdev/usehooks";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import dayjs from "dayjs";

interface TaskDetailProps {
  task: Task;
}

const TaskDetail = ({ task }: TaskDetailProps) => {
  const params = useParams<{ id: string; taskId: string }>();
  const [description, setDescription] = useState(task.description);
  const [isEditDescription, setIsEditDescription] = useState(
    task.description === "",
  );
  const [title] = useState(task.title);
  const [assigneeId] = useState(task.assigneeId);
  const [dueDate] = useState(dayjs(task.dueDate).unix());
  const [priority] = useState(task.priority);
  const debouncedDescription = useDebounce(description, 500);

  const [isPending, strartTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    [],
  );

  useEffect(() => {
    if (debouncedDescription !== task.description) {
      const payload = UpdateTaskSchema.parse({
        columnId: task.columnId,
        description: debouncedDescription,
        title,
        assigneeId,
        dueDate,
        priority,
      });

      strartTransition(() => {
        updateTask({
          projectId: params.id,
          taskId: task.id,
          payload,
        }).catch((error) => {
          toast({
            type: "error",
            message: error.message,
          });
        });
      });
    }
  }, [
    debouncedDescription,
    params.id,
    strartTransition,
    task,
    title,
    assigneeId,
    dueDate,
    priority,
  ]);

  useEffect(() => {
    const element = formRef.current;

    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsEditDescription(false);
      }
    };

    if (element) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (element) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [formRef, setIsEditDescription]);

  return (
    <main className="max-h-full">
      <div className="flex flex-row gap-x-2">
        <div className="w-2/3">
          <div className="flex flex-col items-start justify-between space-y-4 lg:items-center lg:space-y-0 lg:flex-row mb-2">
            <h1 className="text-lg font-normal whitespace-nowrap text-black">
              {task.title}
            </h1>
          </div>
          <div className="flex flex-row gap-x-4 mb-4">
            <button
              type="button"
              className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 flex flex-row gap-x-2"
            >
              <PaperClipIcon className="w-5 h-5 my-auto" />
              <p>Attach files</p>
            </button>
            <button
              type="button"
              className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 flex flex-row gap-x-2"
            >
              <Square3Stack3DIcon className="w-5 h-5 my-auto" />
              <p>Add a child issue</p>
            </button>
            <button
              type="button"
              className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 flex flex-row gap-x-2"
            >
              <LinkIcon className="w-5 h-5 my-auto" />
              <p>Link issue</p>
            </button>
          </div>
          <form ref={formRef}>
            <p className="text-md font-semibold mb-2">Description</p>
            {!isEditDescription ? (
              <pre
                className="cursor-pointer whitespace-pre-wrap mb-8"
                onClick={() => setIsEditDescription(true)}
              >
                {task.description}
              </pre>
            ) : (
              <textarea
                className="w-full p-2 border rounded resize-none mb-2"
                placeholder="Add a description"
                defaultValue={task.description}
                onChange={handleChange}
                rows={10}
              />
            )}
          </form>
          <div>
            <p className="text-md font-semibold mb-2">Activity</p>
            <div className="flex flex-row gap-x-2">
              <p className="my-auto">Show:</p>
              <button
                type="button"
                className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
              >
                All
              </button>
              <button
                type="button"
                className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Comments
              </button>
              <button
                type="button"
                className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
              >
                History
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="flex flex-row gap-x-2 mb-4">
            <button
              type="button"
              className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              Column
            </button>
            <button
              type="button"
              className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              Actions
            </button>
          </div>
          <div className="border rounded p-4">
            <p className="text-sm text-gray-600 mb-4">Details</p>
            <hr className="my-2" />
            <div className="flex flex-row gap-x-2 mt-4">
              <p className="w-1/3 text-sm text-gray-600">Assignee</p>
              <p className="text-sm text-gray-600">
                {task.assigneeId ?? "N/A"}
              </p>
            </div>
            <div className="flex flex-row gap-x-2 mt-4">
              <p className="w-1/3 text-sm text-gray-600">Labels</p>
              <p className="text-sm text-gray-600"></p>
            </div>
            <div className="flex flex-row gap-x-2 mt-4">
              <p className="w-1/3 text-sm text-gray-600">Parents</p>
              <p className="text-sm text-gray-600"></p>
            </div>
            <div className="flex flex-row gap-x-2 mt-4">
              <p className="w-1/3 text-sm text-gray-600">Reporter</p>
              <p className="text-sm text-gray-600"></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TaskDetail;
