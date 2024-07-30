"use client";

import reorder from "@/utils/reorder";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ProjectColumn from "../column";
import Droppable from "../droppable";
import { Column } from "@/interfaces/column";

interface ProjectBoardProps {
  isCombineEnabled: boolean;
  initial: Column[];
}

const ProjectBoard = ({ isCombineEnabled, initial }: ProjectBoardProps) => {
  const [columns, setColumns] = useState([
    ...initial,
    { name: "add-column", tasks: [] },
  ]);

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

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          isCombineEnabled={isCombineEnabled}
          className="gap-x-2"
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
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ProjectBoard;
