import React, { useState, useTransition } from "react";
import Droppable from "../droppable";
import Draggable from "../draggable";
import clsx from "clsx";
import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import createColumn from "@/actions/create-column";
import toast from "@/components/toast";
import { useParams } from "next/navigation";
import { Column } from "@/interfaces/column";

interface ProjectColumnProps {
  column: Column;
  index: number;
  isScrollable: boolean;
  isCombineEnabled: boolean;
}

const ProjectColumn = (props: ProjectColumnProps) => {
  const params = useParams();

  const { id } = params;

  const { column, index } = props;

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

  if (!id) {
    return null;
  }

  return (
    <Draggable
      draggableId={column.id}
      index={index}
      className={clsx(
        column.name !== "add-column" &&
          "xl:w-1/5 p-2 bg-gray-100 rounded-lg shadow-md",
      )}
    >
      {column.name !== "add-column" ? (
        <p className="mb-2 text-black">{column.name}</p>
      ) : open ? (
        <>
          <div className="bg-gray-100 p-0.5 rounded-lg shadow-md mb-1">
            <input
              type="text"
              className="w-full p-2 bg-white rounded-lg shadow-md text-black"
              placeholder="Add a column"
              value={newColumn}
              onChange={(e) => setNewColumn(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-end gap-x-2">
            <button
              type="button"
              className="rounded-lg p-1 bg-gray-100 hover:bg-gray-200"
              onClick={handleCreateColumn}
            >
              <CheckIcon className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="rounded-lg p-1 bg-gray-100 hover:bg-gray-200"
              onClick={() => setOpen(!open)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          className="bg-gray-100 rounded-lg p-1 hover:bg-gray-50"
          onClick={() => setOpen(!open)}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      )}
      {column.name !== "add-column" && (
        <Droppable
          direction="vertical"
          droppableId={column.id}
          type="TASK"
          isCombineEnabled={props.isCombineEnabled}
          className="gap-y-2 h-full"
        >
          {column.tasks.map((task: any, index: number) => (
            <Draggable
              draggableId={task.id}
              index={index}
              key={task.id}
              className="p-2 bg-white rounded-lg shadow-md text-black"
            >
              {task.title}
            </Draggable>
          ))}
        </Droppable>
      )}
    </Draggable>
  );
};

export default ProjectColumn;
