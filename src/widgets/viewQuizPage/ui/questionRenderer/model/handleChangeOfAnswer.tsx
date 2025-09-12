import { ItemType } from "@/shared/model/quiz";

interface BaseAnswerChange {
  type: ItemType.Radio | ItemType.Text;
  onAnswerChange: (questionId: string, value: string | string[]) => void;
  questionId: string;
  value: string;
}

interface CheckboxAnswerChange {
  type: ItemType.Checkbox;
  questionId: string;
  optionText: string;
  checked: boolean;
  answers: Record<string, string | string[]>;
  onAnswerChange: (questionId: string, value: string | string[]) => void;
}

type HandleChangeOfAnswerType = BaseAnswerChange | CheckboxAnswerChange;

const handleChangeOfAnswer = (params: HandleChangeOfAnswerType) => {
  if (params.type === ItemType.Checkbox) {
    const { questionId, optionText, checked, answers, onAnswerChange } = params;
    const currentAnswers = (answers[questionId] as string[]) || [];

    if (checked) {
      onAnswerChange(questionId, [...currentAnswers, optionText]);
    } else {
      onAnswerChange(
        questionId,
        currentAnswers.filter((ans) => ans !== optionText)
      );
    }
  } else {
    const { questionId, value, onAnswerChange } = params;
    onAnswerChange(questionId, value);
  }
};

export { handleChangeOfAnswer };
