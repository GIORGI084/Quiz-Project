import { useState, useEffect, useMemo, useCallback } from "react";
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

  const questions = useMemo(
    () => quiz?.layout.filter((item) => item.type !== "heading") || [],
    [quiz]
  );

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
  };
};
