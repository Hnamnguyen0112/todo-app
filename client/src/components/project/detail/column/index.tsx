import React, { useCallback, useState, useTransition } from "react";
import Droppable from "../droppable";
import Draggable from "../draggable";
import createColumn from "@/actions/create-column";
import toast from "@/components/toast";
import { useParams } from "next/navigation";
import { Column } from "@/interfaces/column";
import {
  CheckIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Task } from "@/interfaces/task";
import TaskComponent from "../task";

interface ProjectColumnProps {
  column: Column;
  index: number;
  isScrollable: boolean;
  isCombineEnabled: boolean;
  isLast: boolean;
}

const ProjectColumn = (props: ProjectColumnProps) => {
  const params = useParams();

  const { id } = params;

  const { column, index, isLast } = props;

  const [open, setOpen] = useState(false);
  const [newColumn, setNewColumn] = useState("");
  const [isPending, strartTransition] = useTransition();

  const handleCreateColumn = () => {
    const payload = {
      name: newColumn,
      position: index + 1,
    };

    strartTransition(() => {
      createColumn({ projectId: id as string, payload })
        .then(() => {
          toast({
            type: "success",
            message: "Column created successfully",
          });
        })
        .catch(() => {
          toast({
            type: "error",
            message: "Something went wrong",
          });
        })
        .finally(() => {
          setNewColumn("");
          setOpen(false);
        });
    });
  };

  const handleOpenCreateColumn = useCallback(() => {
    const boardEl = document.getElementById("board");
    if (boardEl) {
      setTimeout(() => {
        boardEl.scrollTo({
          left: boardEl.scrollWidth,
          behavior: "smooth",
        });
      }, 0);
    }

    setOpen(true);
  }, []);

  if (!id) {
    return null;
  }

  return (
    <Draggable
      draggableId={column.id}
      index={index}
      className="min-w-40 lg:min-w-60 xl:min-w-80 p-2 bg-gray-100 rounded-lg shadow-md relative"
    >
      <div className="flex flex-row justify-between mb-2">
        <p className="mb-2 text-black my-auto">{column.name}</p>
        <button className="p-2 bg-white rounded-lg text-black text-left shadow-md">
          <EllipsisVerticalIcon className="w-5 h-5" />
        </button>
      </div>

      <Droppable
        direction="vertical"
        droppableId={column.id}
        type="TASK"
        isCombineEnabled={props.isCombineEnabled}
        className="gap-y-2 h-full"
      >
        {column.tasks.map((task: Task, index: number) => (
          <TaskComponent key={task.id} task={task} index={index} />
        ))}
      </Droppable>
      {isLast &&
        (open ? (
          <div className="absolute top-0 xl:right-[-340px] lg:right-[-260px] right-[-180px] flex flex-col bg-gray-100 p-2 rounded-lg">
            <input
              type="text"
              value={newColumn}
              onChange={(e) => setNewColumn(e.target.value)}
              className="w-40 lg:w-60 xl:w-80 p-2 bg-white rounded-lg shadow-md"
            />
            <div className="flex flex-row justify-end gap-x-2">
              <button
                onClick={handleCreateColumn}
                className="p-2 bg-white rounded-lg text-gray-800 text-left mt-2 shadow-md"
              >
                <CheckIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-2 bg-white rounded-lg text-gray-800 text-left mt-2 shadow-md"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleOpenCreateColumn}
            className="p-2 bg-gray-100 rounded-lg text-black text-left top-0 right-[-40px] absolute hover:bg-gray-200 transition-all duration-200"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        ))}
    </Draggable>
  );
};

export default ProjectColumn;
