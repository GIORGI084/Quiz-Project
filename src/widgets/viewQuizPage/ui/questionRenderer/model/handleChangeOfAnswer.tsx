interface BaseAnswerChange {
  type: "radio" | "text";
  onAnswerChange: (questionId: string, value: string | string[]) => void;
  questionId: string;
  value: string;
}

interface CheckboxAnswerChange {
  type: "checkbox";
  questionId: string;
  optionText: string;
  checked: boolean;
  answers: Record<string, string | string[]>;
  onAnswerChange: (questionId: string, value: string | string[]) => void;
}

type HandleChangeOfAnswerType = BaseAnswerChange | CheckboxAnswerChange;

const handleChangeOfAnswer = (params: HandleChangeOfAnswerType) => {
  if (params.type === "checkbox") {
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
