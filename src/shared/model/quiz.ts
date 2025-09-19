enum ItemTypeEnum {
  Heading = "heading",
  Footer = "footer",
  Text = "text",
  Radio = "radio",
  Checkbox = "checkbox",
  Button = "button",
}

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  title: string;
  type: ItemTypeEnum;
  options: Option[];
}

interface Heading {
  text: string;
  id: string;
  type: ItemTypeEnum.Heading;
}

interface Footer {
  text: string;
  id: string;
  type: ItemTypeEnum.Footer;
}

interface Button {
  id: string;
  text: string;
  url?: string;
  type: ItemTypeEnum.Button;
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
  LayoutItem,
  Option,
  Footer,
  QuestionState,
};
export { ItemTypeEnum };
