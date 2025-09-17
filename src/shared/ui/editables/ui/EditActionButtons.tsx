import React from "react";

interface EditActionButtonsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
  size?: "sm" | "md";
}

const EditActionButtons: React.FC<EditActionButtonsProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  size = "md",
}) => {
  const buttonClass =
    size === "sm" ? "px-1 py-0.5 text-xs" : "px-2 py-1 text-xs";

  if (isEditing) {
    return (
      <div className="flex gap-1">
        <button
          onClick={onSave}
          className={`${buttonClass} text-green-600 hover:bg-green-50 rounded`}
        >
          ✓
        </button>
        <button
          onClick={onCancel}
          className={`${buttonClass} text-gray-600 hover:bg-gray-50 rounded`}
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-1">
      <button
        onClick={onEdit}
        className={`${buttonClass} text-blue-600 hover:bg-blue-50 rounded`}
      >
        Edit
      </button>
      {onDelete && (
        <button
          onClick={onDelete}
          className={`${buttonClass} text-red-600 hover:bg-red-50 rounded`}
        >
          Del
        </button>
      )}
    </div>
  );
};

export { EditActionButtons };
