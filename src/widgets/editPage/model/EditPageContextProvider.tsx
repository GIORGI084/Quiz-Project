import React, {
  createContext,
  type ReactElement,
  useState,
  useEffect,
} from "react";
import type { QuizType, LayoutItem } from "@/shared/model/quiz";
import { v4 as uuidv4 } from "uuid";
import { getQuiz } from "@/entities/quiz/model/handleStorage"; 
import { useParams } from "next/navigation";

const EditPageContext = createContext<{
  quizContainer: QuizType;
  setQuizContainer: React.Dispatch<React.SetStateAction<QuizType>>;
  quizLayout: LayoutItem[];
  setQuizLayout: React.Dispatch<React.SetStateAction<LayoutItem[]>>;
} | null>(null);

const EditPageContextProvider = ({ children }: { children: ReactElement }) => {
  const [quizContainer, setQuizContainer] = useState<QuizType>({
    id: uuidv4(),
    title: "Add Quiz Title",
    published: false,
    updatedAt: "notUpdated",
    layout: [],
  });

  const [quizLayout, setQuizLayout] = useState<LayoutItem[]>(
    quizContainer.layout
  );

  const { id } = useParams();

  useEffect(() => {
    if (id && typeof id === "string") {
      const existingQuiz = getQuiz(id);

      if (existingQuiz && typeof existingQuiz !== "boolean") {
        const { createdAt, ...quizData } = existingQuiz;

        setQuizContainer(quizData);
        setQuizLayout(quizData.layout);
      } else {
        console.warn(`Quiz with ID ${id} not found in localStorage`);
      }
    }
  }, [id]);

  useEffect(() => {
    setQuizLayout(quizContainer.layout);
  }, [quizContainer.layout]);

  return (
    <EditPageContext.Provider
      value={{ quizContainer, setQuizContainer, quizLayout, setQuizLayout }}
    >
      {children}
    </EditPageContext.Provider>
  );
};

export { EditPageContext, EditPageContextProvider };
