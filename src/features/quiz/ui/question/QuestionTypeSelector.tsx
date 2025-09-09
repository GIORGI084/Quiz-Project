import React from "react";
import type { QuestionInputTypes } from "@/shared/model/quiz";

type QuestionTypeSelectorProps = {
  value: QuestionInputTypes;
  onChange: (type: QuestionInputTypes) => void;
};

const QuestionTypeSelector = ({
  value,
  onChange,
}: QuestionTypeSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-600">Type:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as QuestionInputTypes)}
        className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="radio">Radio</option>
        <option value="checkbox">Checkbox</option>
        <option value="text">Text</option>
      </select>
    </div>
  );
};

export { QuestionTypeSelector };
