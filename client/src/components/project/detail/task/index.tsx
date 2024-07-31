import { Task } from "@/interfaces/task";
import Draggable from "../draggable";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

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
      className="py-2 px-4 bg-white rounded-lg shadow-md text-black flex flex-col justify-between gap-y-2"
    >
      <div className="flex justify-between flex-row">
        <p className="font-semibold my-auto">{task.title}</p>
        <Menu>
          <MenuButton className="p-2 bg-white rounded-lg text-black text-left focus:outline-none ">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-40 origin-top-right rounded-xl bg-white shadow-md p-1 mt-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-50 text-black">
                Copy issue link
              </button>
            </MenuItem>

            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-50 text-black">
                Copy issue key
              </button>
            </MenuItem>

            <div className="my-1 h-px bg-gray-200" />

            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-50 text-black">
                Add flag
              </button>
            </MenuItem>

            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-50 text-black">
                Add label
              </button>
            </MenuItem>

            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-50 text-black">
                Link issue
              </button>
            </MenuItem>

            <div className="my-1 h-px bg-gray-200" />

            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-50 text-black">
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <p className="line-clamp-2 text-sm text-gray-700">{task.description}</p>
    </Draggable>
  );
};

export default TaskC;
