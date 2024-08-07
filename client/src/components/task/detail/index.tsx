import { Task } from "@/interfaces/task";
import {
  LinkIcon,
  PaperClipIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

interface TaskDetailProps {
  task: Task;
}

const TaskDetail = ({ task }: TaskDetailProps) => {
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
          <div>
            <p className="text-md font-semibold mb-2">Description</p>
            {task.description !== "" ? (
              <p>{task.description}</p>
            ) : (
              <textarea
                className="w-full p-2 border rounded resize-none"
                placeholder="Add a description"
              />
            )}
          </div>
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
