import React from "react";
import { Button } from "@/shared/ui/Button";
import FileIcon from "@/icons/FileIcon";

const EmptyQuizList = () => {
  return (
    <div className="text-center py-16 flex justify-center items-center flex-col">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <FileIcon />
      </div>
      <p className="text-lg font-medium text-gray-900 mb-2">No quizzes yet</p>
      <p className="text-gray-500 mb-6">
        Get started by creating your first quiz
      </p>
      <Button href="/quiz/edit" type="primary" className="max-w-xs">
        Create Your First Quiz
      </Button>
    </div>
  );
};

export { EmptyQuizList };
