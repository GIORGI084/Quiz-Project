"use client";
import { useState, useEffect } from "react";
import { QuizCard } from "@/widgets/quizListPage/ui/QuizCard";
import type { StoredQuizType } from "@/shared/model/quiz";
import { getQuizzes } from "@/entities/quiz/model/handleStorage";
import { Header } from "@/shared/ui/Header";
import { EmptyQuizList } from "@/widgets/quizListPage/ui/EmptyQuizList";
const QuizList = () => {
  const [quizzes, setQuizzes] = useState<StoredQuizType[]>([]);

  useEffect(() => {
    setQuizzes(getQuizzes());
  }, []);

  return (
    <main className="mx-auto max-w-[1300px] w-full px-4 py-8">
      <Header />
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Quiz List
      </h1>
      {quizzes.length === 0 ? (
        <EmptyQuizList />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((singleQuiz) => (
            <QuizCard quiz={singleQuiz} key={singleQuiz.id} />
          ))}
        </div>
      )}
    </main>
  );
};

export { QuizList };
