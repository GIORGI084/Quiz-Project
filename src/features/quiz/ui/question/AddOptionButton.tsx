import React from "react";

type AddOptionButtonProps = {
  onClick: () => void;
};

const AddOptionButton = ({ onClick }: AddOptionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 px-3 border border-dashed border-gray-300 rounded text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
    >
      Add New Option
    </button>
  );
};

export { AddOptionButton };
