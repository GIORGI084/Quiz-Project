import React from "react";
import { useEditable } from "@/shared/ui/editables/model/useEditable";
import { EditActionButtons } from "@/shared/ui/editables/ui/EditActionButtons";

interface EditableTitleProps {
  title: string;
  settitle: (newTitle: string) => void;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ title, settitle }) => {
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
    initialText: title || "",
    onTextChange: settitle,
  });

  return (
    <div className="bg-white border border-gray-200 rounded px-2 py-1 flex items-center max-w-[400px] w-full gap-2">
      {/* Title Text */}
      <div className="flex-1">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your title here..."
          />
        ) : (
          <div
            onClick={startEditing}
            className="w-full px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 rounded min-h-[32px] flex items-center"
          >
            {editText || (
              <span className="text-gray-400 italic">
                Click to add title text...
              </span>
            )}
          </div>
        )}
      </div>
      <EditActionButtons
        isEditing={isEditing}
        onEdit={startEditing}
        onSave={handleSave}
        onCancel={handleCancel}
        size="sm"
      />
    </div>
  );
};

export { EditableTitle };
