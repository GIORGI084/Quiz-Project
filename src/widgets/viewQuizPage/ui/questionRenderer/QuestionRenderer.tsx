import React, { type ReactElement } from "react";
import { QuestionRendererProps } from "@/widgets/viewQuizPage/ui/questionRenderer/model/types";
import { RadioQuestion } from "@/widgets/viewQuizPage/ui/questionRenderer/ui/RadioQuestion";
import { CheckboxQuestion } from "@/widgets/viewQuizPage/ui/questionRenderer/ui/CheckboxQuestion";
import { handleChangeOfAnswer } from "@/widgets/viewQuizPage/ui/questionRenderer/model/handleChangeOfAnswer";
import type { LayoutItem, Question } from "@/shared/model/quiz";
import { ItemTypeEnum } from "@/shared/model/quiz";

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  item,
  questionNumber,
  totalQuestions,
  answers,
  onAnswerChange,
}) => {
  if (item.type === ItemTypeEnum.Heading) {
    return null;
  }

  const isQuestion = (item: LayoutItem): item is Question => {
    return (
      item.type === ItemTypeEnum.Radio ||
      item.type === ItemTypeEnum.Checkbox ||
      item.type === ItemTypeEnum.Text
    );
  };

  const createQuestionComponent = (item: LayoutItem): ReactElement | null => {
    if (isQuestion(item)) {
      switch (item.type) {
        case ItemTypeEnum.Radio:
          return (
            <RadioQuestion
              item={item}
              onAnswerChange={onAnswerChange}
              answers={answers}
            />
          );
        case ItemTypeEnum.Checkbox:
          return (
            <CheckboxQuestion
              item={item}
              onAnswerChange={onAnswerChange}
              answers={answers}
            />
          );
        case ItemTypeEnum.Text:
          return (
            <textarea
              placeholder="Enter your answer here..."
              value={(answers[item.id] as string) || ""}
              onChange={(e) =>
                handleChangeOfAnswer({
                  type: ItemTypeEnum.Text,
                  questionId: item.id,
                  value: e.target.value,
                  onAnswerChange: onAnswerChange,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              rows={4}
            />
          );
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-2">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Question {questionNumber} of {totalQuestions}
      </h3>

      <p className="text-lg text-gray-800 mb-6">
        {"title" in item ? item.title : ""}
      </p>
      {createQuestionComponent(item)}
    </div>
  );
};
export { QuestionRenderer };
