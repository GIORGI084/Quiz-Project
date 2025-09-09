import { Button } from "@/shared/ui/Button";

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
          <Button
            onClick={onSubmit}
            type="primary"
            className="px-8 py-3 p-0 bg-green-600 hover:bg-green-700 font-semibold"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={onNext}
            type="primary"
            className="px-8 py-3 p-0 font-semibold"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
export { NavigationButtons };
