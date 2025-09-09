import React from "react";
import type { LayoutItem } from "@/shared/model/quiz";

interface QuestionRendererProps {
  item: LayoutItem;
  questionNumber: number;
  totalQuestions: number;
  answers: Record<string, string | string[]>;
  onAnswerChange: (questionId: string, value: string | string[]) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  item,
  questionNumber,
  totalQuestions,
  answers,
  onAnswerChange,
}) => {
  const handleRadioChange = (questionId: string, value: string) => {
    onAnswerChange(questionId, value);
  };

  const handleCheckboxChange = (
    questionId: string,
    optionText: string,
    checked: boolean
  ) => {
    const currentAnswers = (answers[questionId] as string[]) || [];

    if (checked) {
      onAnswerChange(questionId, [...currentAnswers, optionText]);
    } else {
      onAnswerChange(
        questionId,
        currentAnswers.filter((ans) => ans !== optionText)
      );
    }
  };

  const handleTextChange = (questionId: string, value: string) => {
    onAnswerChange(questionId, value);
  };

  if (item.type === "heading") {
    return null;
  }

  return (
    <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Question {questionNumber} of {totalQuestions}
      </h3>

      <p className="text-lg text-gray-800 mb-6">
        {"title" in item ? item.title : ""}
      </p>

      {item.type === "radio" && item.options && (
        <div className="space-y-3">
          {item.options.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name={`question-${item.id}`}
                value={option.text}
                checked={answers[item.id] === option.text}
                onChange={(e) => handleRadioChange(item.id, e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">{option.text}</span>
            </label>
          ))}
        </div>
      )}

      {item.type === "checkbox" && item.options && (
        <div className="space-y-3">
          {item.options.map((option) => {
            const currentAnswers = (answers[item.id] as string[]) || [];
            const isChecked = currentAnswers.includes(option.text);

            return (
              <label
                key={option.id}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={option.text}
                  checked={isChecked}
                  onChange={(e) =>
                    handleCheckboxChange(item.id, option.text, e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{option.text}</span>
              </label>
            );
          })}
        </div>
      )}

      {item.type === "text" && (
        <div>
          <textarea
            placeholder="Enter your answer here..."
            value={(answers[item.id] as string) || ""}
            onChange={(e) => handleTextChange(item.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
            rows={4}
          />
        </div>
      )}
    </div>
  );
};

export { QuestionRenderer };
