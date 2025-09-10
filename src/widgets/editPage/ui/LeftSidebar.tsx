import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { BUILDING_BLOCKS } from "@/features/constents/buildingBlocks";
import { DraggableBlock } from "@/widgets/editPage/ui/DraggableBlock";

const LeftSidebar = () => {
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
            {BUILDING_BLOCKS.map((block, index) => (
              <Draggable key={block.id} draggableId={block.id} index={index}>
                {(provided, snapshot) => (
                  <DraggableBlock
                    block={block}
                    provided={provided}
                    snapshot={snapshot}
                  />
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
