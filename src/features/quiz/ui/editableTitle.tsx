import React, { useState } from "react";

interface EditabletitleProps {
  title: string;
  settitle: (newTitle: string) => void;
}

const Editabletitle: React.FC<EditabletitleProps> = ({ title, settitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(title || "");

  const handleSave = () => {
    if (editText.trim()) {
      settitle(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(editText || "");
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded px-2 py-1 flex items-center  max-w-[400px] w-full gap-2">
      {/* title Text */}
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your title here..."
            autoFocus
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
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

      {/* Action Buttons */}
      <div className="flex gap-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-2 py-1 text-xs text-green-600 hover:bg-green-50 rounded transition-colors"
              title="Save title"
            >
              ✓
            </button>
            <button
              onClick={handleCancel}
              className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded transition-colors"
              title="Cancel editing"
            >
              ✕
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Edit title"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
export { Editabletitle };
