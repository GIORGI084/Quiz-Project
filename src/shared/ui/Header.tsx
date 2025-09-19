import React from "react";
import Link from "next/link";
import PlusIcon from "@/icons/PlusIcon";
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
        <PlusIcon />
        Create Quiz
      </Link>
    </header>
  );
};

export { Header };
