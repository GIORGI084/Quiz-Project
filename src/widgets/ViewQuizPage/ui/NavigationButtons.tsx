interface NavigationButtonsProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons = ({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
}: NavigationButtonsProps) => {
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center mt-8">
      <div>
        {currentIndex > 0 && (
          <button
            onClick={onPrevious}
            className="px-6 py-3 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
        )}
      </div>
      <div>
        {isLastQuestion ? (
          <button
            onClick={onSubmit}
            className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold transition-colors"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
export { NavigationButtons };
