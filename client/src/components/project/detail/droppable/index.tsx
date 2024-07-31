import clsx from "clsx";
import { Droppable as DroppableComponent } from "react-beautiful-dnd";

interface DroppableProps {
  children: React.ReactNode;
  droppableId: string;
  type: string;
  direction: "vertical" | "horizontal";
  isCombineEnabled: boolean;
  className?: string;
}

const Droppable = ({
  children,
  droppableId,
  type,
  direction,
  isCombineEnabled,
  className,
}: DroppableProps) => {
  return (
    <DroppableComponent
      droppableId={droppableId}
      type={type}
      direction={direction}
      isCombineEnabled={isCombineEnabled}
    >
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={clsx(
            direction === "vertical" && "flex flex-col",
            direction === "horizontal" && "inline-flex",
            className,
          )}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </DroppableComponent>
  );
};

export default Droppable;
