"use client";

import reorder from "@/utils/reorder";
import { useCallback, useState, useTransition } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ProjectColumn from "../column";
import Droppable from "../droppable";
import { Column } from "@/interfaces/column";
import createColumn from "@/actions/create-column";
import toast from "@/components/toast";
import { useParams } from "next/navigation";
import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ProjectBoardProps {
  isCombineEnabled: boolean;
  initial: Column[];
}

const ProjectBoard = ({ isCombineEnabled, initial }: ProjectBoardProps) => {
  const params = useParams();
  const { id } = params;

  const [columns, setColumns] = useState([...initial]);
  const [open, setOpen] = useState(false);
  const [newColumn, setNewColumn] = useState("");
  const [isPending, strartTransition] = useTransition();

  const onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...columns];
        shallow.splice(result.source.index, 1);
        setColumns(shallow);
        return;
      }

      if (result.type === "TASK") {
        const column = columns.find(
          (column) => column.id === result.source.droppableId,
        );

        if (!column) {
          return;
        }

        const shallow = [...column.tasks];
        shallow.splice(result.source.index, 1);
        setColumns(
          columns.map((col) =>
            col.id === column.id ? { ...column, tasks: shallow } : col,
          ),
        );
        return;
      }
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const reorderedorder = reorder(columns, source.index, destination.index);

      setColumns(reorderedorder);

      return;
    }

    if (result.type === "TASK") {
      const column = columns.find((column) => column.id === source.droppableId);
      if (!column) {
        return;
      }

      setColumns((prev) => {
        const newColumns = [...prev];
        const newColumn = { ...column };
        const [removed] = newColumn.tasks.splice(source.index, 1);

        newColumns.find((col) => col.id === newColumn.id)!.tasks =
          newColumn.tasks;

        const targetColumn = newColumns.find(
          (col) => col.id === destination.droppableId,
        );

        if (!targetColumn) {
          return newColumns;
        }

        targetColumn.tasks.splice(destination.index, 0, removed);

        return newColumns;
      });

      return;
    }
  };

  const handleCreateColumn = () => {
    const payload = {
      name: newColumn,
      position: columns.length + 1,
    };

    strartTransition(() => {
      createColumn({ projectId: id as string, payload })
        .then(({ data }) => {
          toast({
            type: "success",
            message: "Column created successfully",
          });

          setColumns((prev) => [...prev, data]);
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
    const boardEl = document.querySelector(
      `div[data-rbd-droppable-id="board"]`,
    );
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        isCombineEnabled={isCombineEnabled}
        className="gap-x-4 overflow-x-auto overflow-y-hidden min-h-[calc(100vh-175px)]"
      >
        {columns.map((column, index) => (
          <ProjectColumn
            key={column.id}
            column={column}
            index={index}
            isScrollable={false}
            isCombineEnabled={isCombineEnabled}
          />
        ))}
        {open ? (
          <div className="flex flex-col bg-gray-100 p-2 rounded-lg h-28 justify-between">
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
            className="px-2 h-10 bg-gray-100 rounded-lg text-black text-left hover:bg-gray-200 transition-all duration-200"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProjectBoard;
