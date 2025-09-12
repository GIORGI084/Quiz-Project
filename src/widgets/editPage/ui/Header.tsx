import React, { useContext, type ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { EditPageContext } from "@/widgets/editPage/model/EditPageContextProvider";
import { createQuiz, editQuiz } from "@/entities/quiz/model/handleStorage";
import type { QuizType } from "@/shared/model/quiz";
import { Button } from "@/shared/ui/Button";
import { DeleteButton } from "@/widgets/editPage/ui/DeleteButton";

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
      } else {
        createQuiz(quizToSave);
      }

      router.push("/");
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handlePublish = () => {
    quizContainer.published = !quizContainer.published;
    handleSave();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuizContainer((prev: QuizType) => ({
      ...prev,
      title: e.target.value,
    }));

  return (
    <section className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <input
          type="text"
          value={quizContainer.title}
          onChange={handleChange}
          placeholder="Enter quiz title..."
          className="text-xl font-semibold bg-transparent border-none outline-none placeholder-gray-400 flex-1"
        />
      </div>

      <div className="flex items-center gap-3">
        <DeleteButton id={id as string} />
        <Button
          onClick={handleSave}
          type="secondary"
          className="gap-2 px-4 py-2 p-0"
        >
          {id ? "Update" : "Save"}
        </Button>
        <Button
          onClick={handlePublish}
          type="primary"
          className={`gap-2 px-4 py-2 p-0 ${
            quizContainer.published
              ? "bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600"
              : ""
          }`}
        >
          {quizContainer.published ? "Unpublish" : "Publish"}
        </Button>
      </div>
    </section>
  );
};

export { Header };
