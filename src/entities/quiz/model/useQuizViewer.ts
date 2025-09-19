import { useState, useEffect, useCallback } from "react";
import { type StoredQuizType, ItemTypeEnum } from "@/shared/model/quiz";
import { getQuiz } from "@/entities/quiz/model/handleStorage";

export const useQuizViewer = (quizId: string) => {
  const [quiz, setQuiz] = useState<StoredQuizType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  useEffect(() => {
    if (quizId) {
      const fetchedQuiz = getQuiz(quizId);
      if (fetchedQuiz && typeof fetchedQuiz !== "boolean") {
        setQuiz(fetchedQuiz);
      }
    }
  }, [quizId]);

  const questions =
    quiz?.layout.filter(
      (item) =>
        item.type !== ItemTypeEnum.Heading && item.type !== ItemTypeEnum.Footer
    ) || [];

  const getHeadingsForQuestion = (
    questionIndex: number
  ): Array<{ id: string; text: string; type: ItemTypeEnum.Heading }> => {
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

    const headings: Array<{
      id: string;
      text: string;
      type: ItemTypeEnum.Heading;
    }> = [];

    for (let i = currentQuestionLayoutIndex - 1; i >= 0; i--) {
      const item = quiz.layout[i];
      if (item.type === ItemTypeEnum.Heading && ItemTypeEnum.Text in item) {
        headings.unshift(
          item as { id: string; text: string; type: ItemTypeEnum.Heading }
        );
      } else if (item.type !== ItemTypeEnum.Heading) {
        break;
      }
    }

    return headings;
  };

  const getFootersForQuestion = (
    questionIndex: number
  ): Array<{ id: string; text: string; type: ItemTypeEnum.Footer }> => {
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

    const footers: Array<{
      id: string;
      text: string;
      type: ItemTypeEnum.Footer;
    }> = [];

    for (let i = currentQuestionLayoutIndex + 1; i < quiz.layout.length; i++) {
      const item = quiz.layout[i];
      if (item.type === ItemTypeEnum.Footer && ItemTypeEnum.Text in item) {
        footers.push(
          item as { id: string; text: string; type: ItemTypeEnum.Footer }
        );
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
    questions,
    currentQuestionIndex,
    answers,
    handleAnswerChange,
    navigation,
    getHeadingsForQuestion,
    getFootersForQuestion,
  };
};
