import React, { useState } from "react";
import { Option, QuestionInputTypes } from "@/shared/model/quiz";

interface OptionInputProps {
  option: Option;
  index: number;
  type: QuestionInputTypes;
  onEdit: (optionId: string, newText: string) => void;
  onDelete: (optionId: string) => void;
  onToggleCorrect: (optionId: string) => void;
  isDragging: boolean;
}

const EditableInput = ({
  option,
  index,
  type,
  onEdit,
  onDelete,
  onToggleCorrect,
  isDragging,
}: OptionInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(option.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(option.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(option.text);
    setIsEditing(false);
  };

  return (
    <div
      className={`
      bg-white border border-gray-200 rounded px-2 py-1 flex items-center gap-2
      ${isDragging ? "shadow-lg" : "shadow-sm hover:shadow-md"}
      transition-all duration-200
    `}
    >
      <div className="cursor-grab active:cursor-grabbing text-gray-400">⋮⋮</div>

      <span className="text-xs text-gray-500 w-3">{index + 1}</span>

      <input
        type={type}
        name={type === "radio" ? "question-option" : `option-${option.id}`}
        checked={option.isCorrect}
        onChange={() => onToggleCorrect(option.id)}
        className="w-3 h-3 text-blue-600"
      />

      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full px-1 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-wrap"
            autoFocus
          />
        ) : (
          <span
            className={`text-sm block max-w-[446px] break-words ${
              option.isCorrect ? "text-green-700 font-medium" : "text-gray-700"
            }`}
          >
            {option.text}
          </span>
        )}
      </div>

      <div className="flex gap-1">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-1 py-0.5 text-xs text-blue-600 hover:bg-blue-50 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(option.id)}
              className="px-1 py-0.5 text-xs text-red-600 hover:bg-red-50 rounded"
            >
              Del
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-1 py-0.5 text-xs text-green-600 hover:bg-green-50 rounded"
            >
              ✓
            </button>
            <button
              onClick={handleCancel}
              className="px-1 py-0.5 text-xs text-gray-600 hover:bg-gray-50 rounded"
            >
              ✕
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export { EditableInput };
