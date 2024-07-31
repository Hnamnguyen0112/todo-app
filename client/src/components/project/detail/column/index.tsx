import Droppable from "../droppable";
import Draggable from "../draggable";
import { Column } from "@/interfaces/column";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Task } from "@/interfaces/task";
import TaskComponent from "../task";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface ProjectColumnProps {
  column: Column;
  index: number;
  isScrollable: boolean;
  isCombineEnabled: boolean;
  onDelete: (columnId: string) => void;
}

const ProjectColumn = ({
  column,
  index,
  onDelete,
  isCombineEnabled,
}: ProjectColumnProps) => {
  const [openCreateTask, setOpenCreateTask] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const element = inputRef.current;

    if (element) {
      element.addEventListener("blur", () => {
        setOpenCreateTask(false);
      });
    }

    return () => {
      if (element) {
        element.removeEventListener("blur", () => {
          setOpenCreateTask(false);
        });
      }
    };
  }, [inputRef]);

  return (
    <Draggable
      draggableId={column.id}
      index={index}
      className="min-w-40 lg:min-w-60 xl:min-w-80 p-2 bg-gray-100 rounded-lg shadow-md relative group"
    >
      <div className="flex flex-row justify-between mb-2">
        <p className="mb-2 text-black my-auto">{column.name}</p>
        <Menu>
          <MenuButton className="p-2 bg-gray-50 rounded-lg text-black text-left shadow focus:outline-none ">
            <EllipsisVerticalIcon className="w-5 h-5" />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-28 origin-top-right rounded-xl bg-white shadow-md p-1 mt-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <button
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-50 text-black"
                type="button"
                onClick={() => onDelete(column.id)}
              >
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <Droppable
        direction="vertical"
        droppableId={column.id}
        type="TASK"
        isCombineEnabled={isCombineEnabled}
        className="gap-y-2 h-full"
      >
        {column.tasks.map((task: Task, index: number) => (
          <TaskComponent key={task.id} task={task} index={index} />
        ))}

        <div
          className={clsx(
            !openCreateTask ? "hidden" : "flex",
            "flex-col bg-white p-2 rounded h-28 justify-between border-2 border-primary-500",
          )}
        >
          <input
            type="text"
            className="p-2 bg-white text-black focus:outline-none"
            ref={inputRef}
          />
          <div className="flex flex-row justify-end gap-x-2">
            <button
              type="button"
              className="py-1 px-2 bg-primary-500 rounded text-white text-left shadow-md"
              onClick={() => setOpenCreateTask(false)}
            >
              Create
            </button>
          </div>
        </div>

        {!openCreateTask && (
          <button
            type="button"
            className="hidden group-hover:flex gap-x-2 flex-row px-4 py-2 bg-gray-100 rounded text-black w-full text-left hover:bg-gray-200 transition-all duration-200"
            onClick={() => {
              setOpenCreateTask(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
          >
            <PlusIcon className="w-5 h-5 my-auto" />
            Create task
          </button>
        )}
      </Droppable>
    </Draggable>
  );
};

export default ProjectColumn;
