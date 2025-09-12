enum ItemType {
  Heading = "heading",
  Footer = "footer",
  Text = "text",
  Radio = "radio",
  Checkbox = "checkbox",
  Button = "button",
}

type QuestionInputTypes =
  | ItemType.Radio
  | ItemType.Checkbox
  | ItemType.Text
  | ItemType.Heading;

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
  type: ItemType.Heading;
}

interface Footer {
  text: string;
  id: string;
  type: ItemType.Footer;
}

interface Button {
  id: string;
  text: string;
  url?: string;
  type: ItemType.Button;
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
export { ItemType };
