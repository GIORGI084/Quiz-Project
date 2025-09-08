import type { LayoutItem } from "@/shared/model/quiz";

const calculateProgress = (current: number, total: number): number =>
  Math.round((current / total) * 100);

const getQuestionsBefore = (layout: LayoutItem[], currentIndex: number) =>
  layout.filter(
    (item, index) => index < currentIndex && item.type === "heading"
  );

export { calculateProgress, getQuestionsBefore };
