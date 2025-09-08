import React, { useState, useRef, useEffect } from "react";

interface EditableHeadingProps {
  text: string;
  onTextChange: (newText: string) => void;
  className?: string;
}

const EditableHeading: React.FC<EditableHeadingProps> = ({
  text,
  onTextChange,
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim()) {
      onTextChange(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

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
        <div className="absolute right-2 top-2 flex gap-1">
          <button
            onClick={handleSave}
            className="px-2 py-1 text-xs text-green-600 hover:bg-green-50 rounded"
          >
            ✓
          </button>
          <button
            onClick={handleCancel}
            className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <h2
      onClick={() => setIsEditing(true)}
      className={`text-2xl font-bold text-gray-800 cursor-pointer hover:bg-gray-50 rounded-md px-3 py-2 transition-colors border-2 border-transparent hover:border-gray-200 ${className}`}
      title="Click to edit heading"
    >
      {text || "Click to add heading"}
    </h2>
  );
};

export { EditableHeading };
