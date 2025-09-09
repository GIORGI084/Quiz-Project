import React from "react";

const TextQuestionInput = () => {
  return (
    <textarea
      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200 resize-none overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Text input for responses..."
      rows={4}
    />
  );
};

export { TextQuestionInput };
