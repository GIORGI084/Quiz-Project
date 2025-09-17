import { useState, useEffect, useCallback } from "react";
import type { StoredQuizType } from "@/shared/model/quiz";
import { getQuiz } from "@/entities/quiz/model/handleStorage";

export const useQuizViewer = (quizId: string) => {
  const [quiz, setQuiz] = useState<StoredQuizType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  useEffect(() => {
    if (quizId) {
      const fetchedQuiz = getQuiz(quizId);
      if (fetchedQuiz && typeof fetchedQuiz !== "boolean") {
        setQuiz(fetchedQuiz);
      }
    }
    setLoading(false);
  }, [quizId]);

  const questions =
    quiz?.layout.filter(
      (item) => item.type !== "heading" && item.type !== "footer"
    ) || [];

  const getHeadingsForQuestion = (
    questionIndex: number
  ): Array<{ id: string; text: string; type: "heading" }> => {
    if (
      !quiz ||
      !quiz.layout ||
      questionIndex < 0 ||
      questionIndex >= questions.length
    ) {
      return [];
    }

    const currentQuestion = questions[questionIndex];
    const currentQuestionLayoutIndex = quiz.layout.findIndex(
      (item) => item.id === currentQuestion.id
    );

    if (currentQuestionLayoutIndex === -1) return [];

    const headings: Array<{ id: string; text: string; type: "heading" }> = [];

    for (let i = currentQuestionLayoutIndex - 1; i >= 0; i--) {
      const item = quiz.layout[i];
      if (item.type === "heading" && "text" in item) {
        headings.unshift(item as { id: string; text: string; type: "heading" });
      } else if (item.type !== "heading") {
        break;
      }
    }

    return headings;
  };

  const getFootersForQuestion = (
    questionIndex: number
  ): Array<{ id: string; text: string; type: "footer" }> => {
    if (
      !quiz ||
      !quiz.layout ||
      questionIndex < 0 ||
      questionIndex >= questions.length
    ) {
      return [];
    }

    const currentQuestion = questions[questionIndex];
    const currentQuestionLayoutIndex = quiz.layout.findIndex(
      (item) => item.id === currentQuestion.id
    );

    if (currentQuestionLayoutIndex === -1) return [];

    const footers: Array<{ id: string; text: string; type: "footer" }> = [];

    for (let i = currentQuestionLayoutIndex + 1; i < quiz.layout.length; i++) {
      const item = quiz.layout[i];
      if (item.type === "footer" && "text" in item) {
        footers.push(item as { id: string; text: string; type: "footer" });
      } else {
        break;
      }
    }

    return footers;
  };

  const handleAnswerChange = useCallback(
    (questionId: string, value: string | string[]) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const navigation = {
    next: () => setCurrentQuestionIndex((prev) => prev + 1),
    previous: () => setCurrentQuestionIndex((prev) => prev - 1),
    canGoNext: currentQuestionIndex < questions.length - 1,
    canGoPrevious: currentQuestionIndex > 0,
  };

  return {
    quiz,
    loading,
    questions,
    currentQuestionIndex,
    answers,
    handleAnswerChange,
    navigation,
    getHeadingsForQuestion,
    getFootersForQuestion,
  };
};
