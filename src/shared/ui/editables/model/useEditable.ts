import { useState, useRef, useEffect } from "react";

interface UseEditableProps {
  initialText: string;
  onTextChange: (newText: string) => void;
  autoFocus?: boolean;
  selectOnFocus?: boolean;
}

const useEditable = ({
  initialText,
  onTextChange,
  autoFocus = true,
  selectOnFocus = true,
}: UseEditableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(initialText);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current && autoFocus) {
      inputRef.current.focus();
      if (selectOnFocus) {
        inputRef.current.select();
      }
    }
  }, [isEditing, autoFocus, selectOnFocus]);

  const handleSave = () => {
    if (editText.trim()) {
      onTextChange(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(initialText);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const startEditing = () => setIsEditing(true);

  return {
    isEditing,
    editText,
    setEditText,
    inputRef,
    handleSave,
    handleCancel,
    handleKeyDown,
    startEditing,
  };
};

export { useEditable };
