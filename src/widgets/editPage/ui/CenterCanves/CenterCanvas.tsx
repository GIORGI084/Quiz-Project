import React, { useContext } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Question } from "@/features/quiz/ui/question/Question";
import { EditPageContext } from "@/widgets/editPage/model/EditPageContextProvider";
import { EmptyCanvas } from "@/widgets/editPage/ui/CenterCanves/ui/EmptyCanvas";
const CenterCanvas = () => {
  const context = useContext(EditPageContext);

  if (!context) return null;
  const { quizLayout } = context;

  return (
    <Droppable droppableId="canvas" direction="vertical">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`min-h-96 p-4 rounded-lg border-2 border-dashed transition-colors ${
            snapshot.isDraggingOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300"
          }`}
        >
          {quizLayout.length === 0 && !snapshot.isDraggingOver && (
            <EmptyCanvas />
          )}

          {quizLayout.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id.toString()}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`mb-4 ${
                    snapshot.isDragging ? "rotate-2 shadow-lg" : ""
                  }`}
                >
                  <Question questionId={item.id} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export { CenterCanvas };
