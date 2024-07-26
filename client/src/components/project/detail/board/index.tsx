"use client";

import reorder, { reorderQuoteMap } from "@/utils/reorder";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ProjectColumn from "../column";
import Droppable from "../droppable";
import { Column } from "@/interfaces/column";

interface ProjectBoardProps {
  isCombineEnabled: boolean;
  initial: any;
  columns: Column[];
}

const ProjectBoard = ({ isCombineEnabled, initial }: ProjectBoardProps) => {
  const [columns, setColumns] = useState(initial);

  const [ordered, setOrdered] = useState(Object.keys(initial));

  const onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);

      const orderedColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setColumns(orderedColumns);
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
      const reorderedorder = reorder(ordered, source.index, destination.index);

      setOrdered(reorderedorder);

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });

    setColumns(data.quoteMap);
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
          {ordered.map((key, index) => (
            <ProjectColumn
              key={key}
              title={key}
              quotes={columns[key]}
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
