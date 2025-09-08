import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const LeftSidebar = () => {
  const buildingBlocks = [
    {
      id: "question-template",
      type: "question",
      title: "Question",
      description: "Multiple choice or text question",
      color: "bg-green-500",
    },
    {
      id: "heading-template",
      type: "heading",
      title: "Heading",
      description: "Section title or heading",
      icon: "📝",
      color: "bg-blue-500",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Building Blocks
      </h3>

      <Droppable
        droppableId="sidebar"
        direction="vertical"
        isDropDisabled={true}
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            {buildingBlocks.map((block, index) => (
              <Draggable key={block.id} draggableId={block.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-3 bg-gray-50 rounded-md border border-gray-200 cursor-grab transition-all duration-200 ${
                      snapshot.isDragging
                        ? "shadow-lg scale-105 rotate-2 bg-white border-blue-300"
                        : "hover:bg-gray-100 hover:shadow-md"
                    }`}
                    style={{
                      ...provided.draggableProps.style,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 ${block.color} rounded-full flex items-center justify-center text-xs`}
                      ></div>
                      <span className="text-sm font-medium">{block.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {block.description}
                    </p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </aside>
  );
};

export { LeftSidebar };
