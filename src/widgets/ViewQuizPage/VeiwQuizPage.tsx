import { useParams } from "next/navigation";
import React from "react";
import { useQuizViewer } from "@/entities/quiz/model/useQuizViewer";
import { Header } from "@/shared/ui/Header";
import { QuizHeader } from "@/widgets/ViewQuizPage/ui/QuizHeader ";
import { QUIZ_MESSAGES } from "@/shared/constants/messages";
import { useQuizSubmission } from "@/entities/quiz/model/useQuizSubmission";
import { NavigationButtons } from "@/widgets/ViewQuizPage/ui/NavigationButtons";
import { ProgressBar } from "@/widgets/ViewQuizPage/ui/ProgressBar";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "@/shared/ui/ErrorMessage/ErrorMessage";
import { QuestionRenderer } from "@/widgets/ViewQuizPage/ui/QuestionRenderer";
const ViewQuizPage = () => {
  const { id } = useParams();
  const quizId = typeof id === "string" ? id : "";

  const {
    quiz,
    loading,
    questions,
    currentQuestionIndex,
    answers,
    handleAnswerChange,
    navigation,
  } = useQuizViewer(quizId);

  const { handleSubmit } = useQuizSubmission();

  if (loading) {
    return (
      <>
        <Header />
        <LoadingSpinner />
      </>
    );
  }

  if (!quiz) {
    return (
      <>
        <Header />
        <ErrorMessage message={QUIZ_MESSAGES.NOT_FOUND} />
      </>
    );
  }

  if (!quiz.published) {
    return (
      <>
        <Header />
        <ErrorMessage message={QUIZ_MESSAGES.NOT_PUBLISHED} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <QuizHeader title={quiz.title} description={QUIZ_MESSAGES.COMPLETION} />

        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
        />

        <QuestionRenderer
          item={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          answers={answers}
          onAnswerChange={handleAnswerChange}
        />

        <NavigationButtons
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onPrevious={navigation.previous}
          onNext={navigation.next}
          onSubmit={() => handleSubmit(answers)}
        />
      </div>
    </div>
  );
};
export { ViewQuizPage };
