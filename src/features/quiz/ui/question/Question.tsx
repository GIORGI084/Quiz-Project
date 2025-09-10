import React, { forwardRef, type HTMLAttributes } from "react";
import { useQuestion } from "@/features/quiz/model/useQuestion";
import { TextComponent } from "@/features/quiz/ui/question/TextComponent";
import { QuestionContent } from "@/features/quiz/ui/question/QuestionContent";
import type { Heading, Footer, QuestionState } from "@/shared/model/quiz";

type QuestionProps = {
  questionId: string;
} & HTMLAttributes<HTMLDivElement>;

const Question = forwardRef<HTMLDivElement, QuestionProps>(function Question(
  { questionId, ...rest },
  ref
) {
  const {
    item,
    handleHeadingTextChange,
    handleEditOption,
    handleDeleteOption,
    handleToggleCorrect,
    handleAddOption,
    handleTypeChange,
    handleTitleChange,
    handleDragEnd,
  } = useQuestion(questionId);

  if (item.type === "heading") {
    return (
      <TextComponent
        ref={ref}
        element={item as Heading}
        onTextChange={handleHeadingTextChange}
        {...rest}
      />
    );
  }

  if (item.type === "footer") {
    return (
      <TextComponent
        ref={ref}
        element={item as Footer}
        onTextChange={handleHeadingTextChange}
        {...rest}
      />
    );
  }

  const questionItem = item as QuestionState;
  return (
    <div className="w-full flex justify-around" ref={ref} {...rest}>
      <div className="w-full max-w-2xl p-4">
        <QuestionContent
          question={questionItem}
          onTitleChange={handleTitleChange}
          onTypeChange={handleTypeChange}
          onDragEnd={handleDragEnd}
          onEditOption={handleEditOption}
          onDeleteOption={handleDeleteOption}
          onToggleCorrect={handleToggleCorrect}
          onAddOption={handleAddOption}
        />
      </div>
    </div>
  );
});

Question.displayName = "Question";

export { Question };
