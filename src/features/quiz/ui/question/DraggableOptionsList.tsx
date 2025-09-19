import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { EditableInput } from "@/shared/ui/editables/ui/EditableInput";
import type { ItemTypeEnum, QuestionState } from "@/shared/model/quiz";

type DraggableOptionsListProps = {
  options: QuestionState["options"];
  questionType: ItemTypeEnum;
  onDragEnd: (result: DropResult) => void;
  onEditOption: (optionId: string, newText: string) => void;
  onDeleteOption: (optionId: string) => void;
  onToggleCorrect: (optionId: string) => void;
};

const DraggableOptionsList = ({
  options,
  questionType,
  onDragEnd,
  onEditOption,
  onDeleteOption,
  onToggleCorrect,
}: DraggableOptionsListProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="options">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {options.map((option, index) => (
              <Draggable key={option.id} draggableId={option.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <EditableInput
                      option={option}
                      index={index}
                      type={questionType}
                      onEdit={onEditOption}
                      onDelete={onDeleteOption}
                      onToggleCorrect={onToggleCorrect}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export { DraggableOptionsList };
