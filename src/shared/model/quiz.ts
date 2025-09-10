type QuestionInputTypes = "radio" | "checkbox" | "text" | "heading";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  title: string;
  type: QuestionInputTypes;
  options: Option[];
}

interface Heading {
  text: string;
  id: string;
  type: "heading";
}

interface Footer {
  text: string;
  id: string;
  type: "footer";
}

interface Button {
  id: string;
  text: string;
  url?: string;
  type: "button";
}
type LayoutItem = Question | Heading | Button | Footer;

interface QuizType {
  title: string;
  published: boolean;
  updatedAt: string;
  layout: LayoutItem[];
  id?: string;
}

interface StoredQuizType extends QuizType {
  createdAt: string;
}

type QuestionState = Omit<Question, "options"> & {
  options: Option[];
};

export type {
  QuizType,
  StoredQuizType,
  Question,
  Heading,
  Button,
  QuestionInputTypes,
  LayoutItem,
  Option,
  Footer,
  QuestionState,
};
