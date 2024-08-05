import Droppable from "../droppable";
import Draggable from "../draggable";
import { Column } from "@/interfaces/column";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Task } from "@/interfaces/task";
import TaskComponent from "../task";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  TransitionStartFunction,
} from "react";
import useCreateTask from "../create-task";
import { UpdateColumnSchema } from "@/schemas/column";
import updateColumn from "@/actions/update-column";
import toast from "@/components/toast";
import { useParams } from "next/navigation";

interface ProjectColumnProps {
  column: Column;
  index: number;
  isScrollable: boolean;
  isCombineEnabled: boolean;
  onDelete: (columnId: string) => void;
  setColumns: Dispatch<SetStateAction<Column[]>>;
  startTransition: TransitionStartFunction;
}

const ProjectColumn = ({
  column,
  index,
  onDelete,
  isCombineEnabled,
  setColumns,
  startTransition,
}: ProjectColumnProps) => {
  const params = useParams();
  const { id } = params;

  const [state, setState] = useState<"view" | "edit">("view");
  const { open, setOpen, CreateTask, formRef } = useCreateTask({
    column,
    setColumns,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = () => {
    const updateColumnPayload = UpdateColumnSchema.parse({
      name: column.name,
      position: column.position,
    });

    startTransition(() => {
      updateColumn({
        projectId: id as string,
        columnId: column.id,
        payload: updateColumnPayload,
      })
        .catch((error) => {
          toast({
            type: "error",
            message: error.message,
          });
        })
        .finally(() => {
          setState("view");
        });
    });
  };

  return (
    <Draggable
      draggableId={column.id}
      index={index}
      className="min-w-40 lg:min-w-60 xl:min-w-80 p-2 bg-gray-100 rounded-lg shadow-md relative group"
    >
      <div className="flex flex-row justify-between mb-2">
        {state === "view" && (
          <p
            className="mb-2 text-black my-auto w-full"
            onClick={() => {
              setState("edit");
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
          >
            {column.name}
          </p>
        )}
        {state === "edit" && (
          <input
            ref={inputRef}
            type="text"
            className="text-black my-auto w-full px-2 py-1 rounded-lg shadow-sm focus:outline-none"
            value={column.name}
            onChange={(e) => {
              setColumns((prev) =>
                prev.map((col) => {
                  if (col.id === column.id) {
                    return {
                      ...col,
                      name: e.target.value,
                    };
                  }
                  return col;
                }),
              );
            }}
            onBlur={handleUpdate}
          />
        )}
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
        {column.tasks
          .sort((a, b) => a.position - b.position)
          .map((task: Task, index: number) => (
            <TaskComponent
              key={task.id}
              task={task}
              index={index}
              setColumns={setColumns}
            />
          ))}

        <CreateTask />

        {!open && (
          <button
            type="button"
            className="hidden group-hover:flex gap-x-2 flex-row px-4 py-2 bg-gray-100 rounded text-black w-full text-left hover:bg-gray-200 transition-all duration-200"
            onClick={() => {
              setOpen(true);
              setTimeout(() => {
                formRef.current?.focus();
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
