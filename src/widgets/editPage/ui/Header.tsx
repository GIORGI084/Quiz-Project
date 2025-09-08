import React, { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { EditPageContext } from "@/widgets/editPage/model/EditPageContextProvider";
import { createQuiz, editQuiz } from "@/entities/quiz/model/handleStorage";
import type { QuizType } from "@/shared/model/quiz";

const Header = () => {
  const context = useContext(EditPageContext);
  const { id } = useParams();
  const router = useRouter();

  if (!context) return null;
  const { quizContainer, setQuizContainer } = context;

  const handleSave = () => {
    try {
      const quizToSave = {
        ...quizContainer,
        layout: context.quizLayout,
        updatedAt: new Date().toLocaleString(),
      };

      if (id && typeof id === "string") {
        editQuiz(quizToSave);
        console.log(`Quiz with ID ${id} has been updated`);
      } else {
        createQuiz(quizToSave);
        console.log("New quiz has been created");
      }

      router.push("/");
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handlePublish = () => {
    quizContainer.published = true;
    handleSave();
  };

  return (
    <section className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <input
          type="text"
          value={quizContainer.title}
          onChange={(e) =>
            setQuizContainer((prev: QuizType) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          placeholder="Enter quiz title..."
          className="text-xl font-semibold bg-transparent border-none outline-none placeholder-gray-400 flex-1"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          {id ? "Update" : "Save"}
        </button>

        <button
          onClick={handlePublish}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
        >
          Publish
        </button>
      </div>
    </section>
  );
};

export { Header };
