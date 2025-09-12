import { type Question, ItemType } from "@/shared/model/quiz";
import { handleChangeOfAnswer } from "@/widgets/viewQuizPage/ui/questionRenderer/model/handleChangeOfAnswer";
type RadioQuestionProps = {
  item: Question;
  answers: Record<string, string | string[]>;
  onAnswerChange: (questionId: string, value: string | string[]) => void;
};

const CheckboxQuestion: React.FC<RadioQuestionProps> = ({
  item,
  answers,
  onAnswerChange,
}) => {
  return (
    <div className="space-y-3">
      {item.options.map((option) => {
        return (
          <label
            key={option.id}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="checkbox"
              value={option.text}
              onChange={(e) =>
                handleChangeOfAnswer({
                  type: ItemType.Checkbox,
                  questionId: item.id,
                  optionText: option.text,
                  checked: e.target.checked,
                  answers: answers,
                  onAnswerChange: onAnswerChange,
                })
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">{option.text}</span>
          </label>
        );
      })}
    </div>
  );
};

export { CheckboxQuestion };
