import React, { useContext } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

import { Header } from "@/widgets/editPage/ui/Header";
import { LeftSidebar } from "@/widgets/editPage/ui/LeftSidebar";
import { RightSidebar } from "@/widgets/editPage/ui/RightSidebar";
import { CenterCanvas } from "@/widgets/editPage/ui/CenterCanves/CenterCanvas";
import { EditPageContext } from "@/widgets/editPage/model/EditPageContextProvider";
import { ItemTypeEnum } from "@/shared/model/quiz";

enum TemplateId {
  Question = "question-template",
  Heading = "heading-template",
  Footer = "footer-template",
}

enum DroppableId {
  Sidebar = "sidebar",
  Canvas = "canvas",
}

const EditPageContent = () => {
  const context = useContext(EditPageContext);

  if (!context) return null;
  const { quizLayout, setQuizLayout } = context;

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === DroppableId.Sidebar &&
      destination.droppableId === DroppableId.Canvas
    ) {
      const draggedItemId = result.draggableId;

      let newItem;

      if (draggedItemId === TemplateId.Question) {
        newItem = {
          id: uuidv4(),
          title: "New Question",
          type: ItemTypeEnum.Radio as const,
          options: [
            { id: uuidv4(), text: "Option 1", isCorrect: false },
            { id: uuidv4(), text: "Option 2", isCorrect: false },
          ],
        };
      } else if (draggedItemId === TemplateId.Heading) {
        newItem = {
          id: uuidv4(),
          text: "New Heading",
          type: ItemTypeEnum.Heading as const,
        };
      } else if (draggedItemId === TemplateId.Footer) {
        newItem = {
          id: uuidv4(),
          text: "New footer",
          type: ItemTypeEnum.Footer as const,
        };
      } else {
        console.warn(`Unknown template type: ${draggedItemId}`);
        return;
      }

      const newItems = Array.from(quizLayout);
      newItems.splice(destination.index, 0, newItem);
      setQuizLayout(newItems);
      return;
    }

    if (
      source.droppableId === DroppableId.Canvas &&
      destination.droppableId === DroppableId.Canvas
    ) {
      const newItems = Array.from(quizLayout);
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);
      setQuizLayout(newItems);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <LeftSidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            <CenterCanvas />
          </main>
        </DragDropContext>
        <RightSidebar />
      </div>
    </div>
  );
};
export { EditPageContent };
