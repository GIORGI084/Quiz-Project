import { type DropResult } from "@hello-pangea/dnd";
import type { QuestionState } from "@/shared/model/quiz";

const useDragDrop = () => {
  const handleDragEnd = (
    result: DropResult,
    question: QuestionState,
    onUpdate: (updatedQuestion: QuestionState) => void
  ) => {
    if (!result.destination || question.type === "heading") return;

    const items = Array.from(question.options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedQuestion = {
      ...question,
      options: items,
    };

    onUpdate(updatedQuestion);
  };

  return { handleDragEnd };
};

export { useDragDrop };
