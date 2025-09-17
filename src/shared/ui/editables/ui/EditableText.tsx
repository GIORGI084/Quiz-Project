import React from "react";
import { useEditable } from "@/shared/ui/editables/model/useEditable";
import { EditActionButtons } from "@/shared/ui/editables/ui/EditActionButtons";

interface EditableTextProps {
  text: string;
  onTextChange: (newText: string) => void;
  className?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  text,
  onTextChange,
  className = "",
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
    initialText: text,
    onTextChange,
  });

  if (isEditing) {
    return (
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={`text-2xl font-bold text-gray-800 bg-white border-2 border-blue-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          placeholder="Enter heading text..."
        />
        <div className="absolute right-2 top-2 mt-1.5">
          <EditActionButtons
            isEditing={true}
            onEdit={startEditing}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <h2
      onClick={startEditing}
      className={`text-2xl font-bold text-gray-800 cursor-pointer hover:bg-gray-50 rounded-md px-3 py-2 transition-colors border-2 border-transparent hover:border-gray-200 ${className}`}
      title="Click to edit heading"
    >
      {text || "Click to add heading"}
    </h2>
  );
};

export { EditableText };
