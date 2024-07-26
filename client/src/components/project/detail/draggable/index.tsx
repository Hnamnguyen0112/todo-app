import clsx from "clsx";
import { Draggable as DraggableComponent } from "react-beautiful-dnd";

interface DraggableProps {
  draggableId: string;
  index: number;
  children: React.ReactNode;
  className?: string;
}

const Draggable = ({
  draggableId,
  index,
  children,
  className,
}: DraggableProps) => {
  return (
    <DraggableComponent draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(className, {})}
        >
          {children}
        </div>
      )}
    </DraggableComponent>
  );
};

export default Draggable;
