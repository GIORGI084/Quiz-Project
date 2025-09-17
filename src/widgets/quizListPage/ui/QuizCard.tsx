import React from "react";
import { Button } from "@/shared/ui/Button";
import { useRouter } from "next/navigation";
import type { StoredQuizType } from "@/shared/model/quiz";

const QuizCard = ({ quiz }: { quiz: StoredQuizType }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`quiz/edit/${quiz.id}`);
  };

  const handleViewClick = () => {
    router.push(`quiz/${quiz.id}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-[10px] px-[15px]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {quiz.title}
          </h3>
          <div className="flex items-center mt-3 text-sm text-gray-500">
            <span>Create {quiz.createdAt}</span>
          </div>
          <div className="flex items-center  text-sm text-gray-500">
            <span>Updated {quiz.updatedAt}</span>
          </div>
        </div>
        <div className="ml-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              quiz.published
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {quiz.published ? "Published" : "Draft"}
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={handleEditClick} type="secondary">
          Edit
        </Button>

        <Button onClick={handleViewClick} type="primary">
          View
        </Button>
      </div>
    </div>
  );
};

export { QuizCard };
