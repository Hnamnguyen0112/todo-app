import { Task } from "@/interfaces/task";
import Draggable from "../draggable";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface TaskProps {
  task: Task;
  index: number;
}

const TaskC = ({ task, index }: TaskProps) => {
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      key={task.id}
      className="py-2 px-4 bg-white rounded-lg shadow-md text-black h-20"
    >
      <div className="flex justify-between flex-row">
        <p>{task.title}</p>
        <button className="p-2 bg-white rounded-lg text-black text-left shadow-md">
          <EllipsisVerticalIcon className="w-5 h-5" />
        </button>
      </div>
    </Draggable>
  );
};

export default TaskC;
