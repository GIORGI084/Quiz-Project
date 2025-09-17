import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-8 mx-auto max-w-[1300px] w-full px-4 py-8">
      <Link href="/" className="text-3xl font-bold text-gray-900">
        All Quizzes
      </Link>
      <Link
        href="/quiz/edit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create Quiz
      </Link>
    </header>
  );
};

export { Header };
