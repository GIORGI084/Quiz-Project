import { type Question, ItemTypeEnum } from "@/shared/model/quiz";
import { handleChangeOfAnswer } from "@/widgets/viewQuizPage/ui/questionRenderer/model/handleChangeOfAnswer";
type RadioQuestionProps = {
  item: Question;
  answers: Record<string, string | string[]>;
  onAnswerChange: (questionId: string, value: string | string[]) => void;
};

const RadioQuestion: React.FC<RadioQuestionProps> = ({
  item,
  answers,
  onAnswerChange,
}) => {
  return (
    <div className="space-y-3">
      {item.options.map((option) => (
        <label
          key={option.id}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <input
            type="radio"
            name={`question-${item.id}`}
            value={option.text}
            checked={answers[item.id] === option.text}
            onChange={(e) =>
              handleChangeOfAnswer({
                type: ItemTypeEnum.Radio,
                questionId: item.id,
                value: e.target.value,
                onAnswerChange: onAnswerChange,
              })
            }
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700">{option.text}</span>
        </label>
      ))}
    </div>
  );
};

export { RadioQuestion };
