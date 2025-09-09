import React from "react";
import { type DropResult } from "@hello-pangea/dnd";
import { EditableTitle } from "@/features/quiz/ui/question/EditableTitle";
import { QuestionTypeSelector } from "./QuestionTypeSelector";
import { DraggableOptionsList } from "./DraggableOptionsList";
import { TextQuestionInput } from "@/features/quiz/ui/question/TextQuestionInput ";
import { AddOptionButton } from "./AddOptionButton";
import type { QuestionState, QuestionInputTypes } from "@/shared/model/quiz";

type QuestionContentProps = {
  question: QuestionState;
  onTitleChange: (title: string) => void;
  onTypeChange: (type: QuestionInputTypes) => void;
  onDragEnd: (result: DropResult) => void;
  onEditOption: (optionId: string, newText: string) => void;
  onDeleteOption: (optionId: string) => void;
  onToggleCorrect: (optionId: string) => void;
  onAddOption: () => void;
};

const QuestionContent = ({
  question,
  onTitleChange,
  onTypeChange,
  onDragEnd,
  onEditOption,
  onDeleteOption,
  onToggleCorrect,
  onAddOption,
}: QuestionContentProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <EditableTitle title={question.title} settitle={onTitleChange} />
        <QuestionTypeSelector value={question.type} onChange={onTypeChange} />
      </div>

      <div className="mb-4">
        {question.type !== "text" ? (
          <DraggableOptionsList
            options={question.options}
            questionType={question.type}
            onDragEnd={onDragEnd}
            onEditOption={onEditOption}
            onDeleteOption={onDeleteOption}
            onToggleCorrect={onToggleCorrect}
          />
        ) : (
          <TextQuestionInput />
        )}
      </div>

      {question.type !== "text" && <AddOptionButton onClick={onAddOption} />}
    </div>
  );
};

export { QuestionContent };
