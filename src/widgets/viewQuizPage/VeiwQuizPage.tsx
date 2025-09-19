import { useParams } from "next/navigation";
import React from "react";
import { useQuizViewer } from "@/entities/quiz/model/useQuizViewer";
import { Header } from "@/shared/ui/Header";
import { QuizHeader } from "@/widgets/viewQuizPage/ui/QuizHeader ";
import { QUIZ_MESSAGES } from "@/shared/constants/messages";
import { NavigationButtons } from "@/widgets/viewQuizPage/ui/NavigationButtons";
import { ProgressBar } from "@/widgets/viewQuizPage/ui/ProgressBar";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { QuestionRenderer } from "@/widgets/viewQuizPage/ui/questionRenderer/QuestionRenderer";
import { DisplayHeadings } from "@/widgets/viewQuizPage/ui/DisplayHeadings";
import { DisplayFooters } from "@/widgets/viewQuizPage/ui/DisplayFooter";

const ViewQuizPage = () => {
  const { id } = useParams();

  const {
    quiz,
    questions,
    currentQuestionIndex,
    answers,
    handleAnswerChange,
    navigation,
    getHeadingsForQuestion,
    getFootersForQuestion,
  } = useQuizViewer(id as string);

  const handleSubmit = (answers: Record<string, string | string[]>) => {
    console.log("Quiz submitted with answers:", answers);
    alert(
      "Quiz submitted successfully! view answers page will be added answers are stored in answers object showed in console"
    );
  };

  console.log(questions);
  if (!questions || questions.length === 0) {
    return (
      <>
        <Header />
        <ErrorMessage message={QUIZ_MESSAGES.NO_QUESTIONS} />
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

  const currentQuestionHeadings = getHeadingsForQuestion(currentQuestionIndex);
  const currentQuestionFooters = getFootersForQuestion(currentQuestionIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <QuizHeader title={quiz.title} description={QUIZ_MESSAGES.COMPLETION} />

        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
        />

        <DisplayHeadings headings={currentQuestionHeadings} />

        <QuestionRenderer
          item={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          answers={answers}
          onAnswerChange={handleAnswerChange}
        />

        <DisplayFooters footers={currentQuestionFooters} />

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
