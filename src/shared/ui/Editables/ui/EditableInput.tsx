import React from "react";
import { useEditable } from "@/shared/ui/editables/model/useEditable";
import { EditActionButtons } from "./EditActionButtons";
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

const EditableInput: React.FC<OptionInputProps> = ({
  option,
  index,
  type,
  onEdit,
  onDelete,
  onToggleCorrect,
  isDragging,
}) => {
  const {
    isEditing,
    editText,
    setEditText,
    inputRef,
    handleSave,
    handleCancel,
    handleKeyDown,
    startEditing,
  } = useEditable({
    initialText: option.text,
    onTextChange: (newText) => onEdit(option.id, newText),
    selectOnFocus: false,
  });

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
            ref={inputRef}
            type="text"
            value={editText}
            onKeyDown={handleKeyDown}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            className="w-full px-1 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-wrap"
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

      <EditActionButtons
        isEditing={isEditing}
        onEdit={startEditing}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={() => onDelete(option.id)}
        size="sm"
      />
    </div>
  );
};

export { EditableInput };
