import React from "react";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import classNames from "classnames";

interface DraggableBlockProps {
  block: {
    id: string;
    title: string;
    description: string;
    color: string;
  };
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  block,
  provided,
  snapshot,
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={classNames(
        "p-3 bg-gray-50 rounded-md border border-gray-200 cursor-grab transition-all duration-200",
        {
          "shadow-lg scale-105 rotate-2 bg-white border-blue-300":
            snapshot.isDragging,
          "hover:bg-gray-100 hover:shadow-md": !snapshot.isDragging,
        }
      )}
      style={{
        ...provided.draggableProps.style,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 ${block.color} rounded-full flex items-center justify-center text-xs`}
        />
        <span className="text-sm font-medium">{block.title}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{block.description}</p>
    </div>
  );
};

export { DraggableBlock };
