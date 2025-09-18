import type { QuizType, StoredQuizType } from "@/shared/model/quiz";
import { MOCK_QUIZZES } from "@/features/constents/mockQuizzes";

function setMockQuizzes() {
  if (localStorage.getItem("quizzes") === null) {
    localStorage.setItem("quizzes", JSON.stringify(MOCK_QUIZZES));
  }
}

function createQuiz(quiz: QuizType): void {
  const id = Date.now().toString();
  const createdAt = new Date().toLocaleString();
  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  quizzes.unshift({ ...quiz, id, createdAt });
  localStorage.setItem("quizzes", JSON.stringify(quizzes));
}

function editQuiz(quiz: QuizType): void {
  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  const updatedQuizzes = quizzes.map((storedQuiz: StoredQuizType) => {
    if (storedQuiz.id === quiz.id) {
      return {
        ...quiz,
        updatedAt: new Date().toLocaleString(),
        createdAt: storedQuiz.createdAt,
      };
    }
    return storedQuiz;
  });
  localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
}

function getQuizzes(): StoredQuizType[] {
  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  return quizzes;
}

function getQuiz(id: string): StoredQuizType | boolean {
  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  return quizzes.find((quiz: StoredQuizType) => quiz.id === id) || false;
}

function deleteQuiz(id: string) {
  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  const updatedQuizzes = quizzes.filter(
    (quiz: StoredQuizType) => quiz.id !== id
  );
  localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
}

export {
  createQuiz,
  editQuiz,
  getQuizzes,
  getQuiz,
  setMockQuizzes,
  deleteQuiz,
};
