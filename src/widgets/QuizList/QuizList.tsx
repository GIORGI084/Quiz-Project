"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { QuizCard } from "./ui/QuizCard/QuizCard";
import type { StoredQuizType } from "@/shared/model/quiz";
import { getQuizzes } from "@/entities/quiz/model/handleStorage";
import { Header } from "@/shared/ui/Header";

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
        <div className="text-center py-16">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-900 mb-2">
            No quizzes yet
          </p>
          <p className="text-gray-500 mb-6">
            Get started by creating your first quiz
          </p>
          <Link
            href="/quiz/edit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Create Your First Quiz
          </Link>
        </div>
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
