import { LayoutItem } from "@/shared/model/quiz";

interface QuestionRendererProps {
  item: LayoutItem;
  questionNumber: number;
  totalQuestions: number;
  answers: Record<string, string | string[]>;
  onAnswerChange: (questionId: string, value: string | string[]) => void;
}
export type { QuestionRendererProps };
