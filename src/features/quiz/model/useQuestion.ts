import { useState, useContext, useEffect, useCallback } from "react";
import { type DropResult } from "@hello-pangea/dnd";
import { EditPageContext } from "@/widgets/editPage/model/EditPageContextProvider";
import type {
  LayoutItem,
  QuestionInputTypes,
  Heading as HeadingState,
  Footer,
  QuestionState,
} from "@/shared/model/quiz";

type ItemState = QuestionState | HeadingState | Footer;

export const useQuestion = (questionId: string) => {
  const [item, setItem] = useState<ItemState>({
    id: crypto.randomUUID(),
    title: "Add your question here",
    type: "radio",
    options: [],
  } as QuestionState);

  const context = useContext(EditPageContext);

  useEffect(() => {
    const quizLayout = context?.quizLayout || [];
    const found = quizLayout.find(
      (layoutItem: LayoutItem) => layoutItem.id === questionId
    );

    if (!found) return;

    if (found.type === "heading") {
      setItem(found as HeadingState);
    } else {
      setItem(found as QuestionState);
    }
  }, [questionId, context?.quizLayout]);

  const updateQuizLayout = useCallback(
    (updatedItem: ItemState) => {
      if (context?.setQuizLayout) {
        const updatedLayout = context.quizLayout.map((layoutItem: LayoutItem) =>
          layoutItem.id === questionId ? updatedItem : layoutItem
        );
        context.setQuizLayout(updatedLayout);
      }
    },
    [context, questionId]
  );

  const handleHeadingTextChange = useCallback(
    (newText: string) => {
      const updatedItem = { ...item, text: newText } as HeadingState;
      setItem(updatedItem);
      updateQuizLayout(updatedItem);
    },
    [item, updateQuizLayout]
  );

  const handleEditOption = useCallback(
    (optionId: string, newText: string) => {
      if (item.type === "heading") return;

      const questionItem = item as QuestionState;
      const updatedItem = {
        ...questionItem,
        options: questionItem.options.map((opt) =>
          opt.id === optionId ? { ...opt, text: newText } : opt
        ),
      };
      setItem(updatedItem);
      updateQuizLayout(updatedItem);
    },
    [item, updateQuizLayout]
  );

  const handleDeleteOption = useCallback(
    (optionId: string) => {
      if (item.type === "heading") return;

      const questionItem = item as QuestionState;
      const updatedItem = {
        ...questionItem,
        options: questionItem.options.filter((opt) => opt.id !== optionId),
      };
      setItem(updatedItem);
      updateQuizLayout(updatedItem);
    },
    [item, updateQuizLayout]
  );

  const handleToggleCorrect = useCallback(
    (optionId: string) => {
      if (item.type === "heading") return;

      const questionItem = item as QuestionState;
      const updatedItem = {
        ...questionItem,
        options: questionItem.options.map((opt) => {
          if (questionItem.type === "radio") {
            return { ...opt, isCorrect: opt.id === optionId };
          } else {
            return opt.id === optionId
              ? { ...opt, isCorrect: !opt.isCorrect }
              : opt;
          }
        }),
      };
      setItem(updatedItem);
      updateQuizLayout(updatedItem);
    },
    [item, updateQuizLayout]
  );

  const handleAddOption = useCallback(() => {
    if (item.type === "heading") return;

    const questionItem = item as QuestionState;
    const newOption = {
      id: `opt${Date.now()}`,
      text: "New option",
      isCorrect: false,
    };
    const updatedItem = {
      ...questionItem,
      options: [...questionItem.options, newOption],
    };
    setItem(updatedItem);
    updateQuizLayout(updatedItem);
  }, [item, updateQuizLayout]);

  const handleTypeChange = useCallback(
    (newType: QuestionInputTypes) => {
      if (item.type === "heading" || newType === "heading") return;

      const questionItem = item as QuestionState;
      const updatedItem = {
        ...questionItem,
        type: newType,
        options:
          newType === "radio"
            ? questionItem.options.map((opt, index) => ({
                ...opt,
                isCorrect:
                  index === 0 && !questionItem.options.some((o) => o.isCorrect)
                    ? true
                    : questionItem.options.filter((o) => o.isCorrect)[0]?.id ===
                      opt.id,
              }))
            : questionItem.options,
      };
      setItem(updatedItem);
      updateQuizLayout(updatedItem);
    },
    [item, updateQuizLayout]
  );

  const handleTitleChange = useCallback(
    (newTitle: string) => {
      if (item.type === "heading") return;

      const questionItem = item as QuestionState;
      const updatedItem = {
        ...questionItem,
        title: newTitle,
      };
      setItem(updatedItem);
      updateQuizLayout(updatedItem);
    },
    [item, updateQuizLayout]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination || item.type === "heading") return;

      const questionItem = item as QuestionState;
      const items = Array.from(questionItem.options);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      const updatedItem = {
        ...questionItem,
        options: items,
      };
      setItem(updatedItem);
      updateQuizLayout(updatedItem);
    },
    [item, updateQuizLayout]
  );

  return {
    item,
    handleHeadingTextChange,
    handleEditOption,
    handleDeleteOption,
    handleToggleCorrect,
    handleAddOption,
    handleTypeChange,
    handleTitleChange,
    handleDragEnd,
  };
};
