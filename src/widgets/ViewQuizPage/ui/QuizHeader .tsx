interface QuizHeaderProps {
  title: string;
  description?: string;
}

const QuizHeader = ({ title, description }: QuizHeaderProps) => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
    {description && <p className="text-gray-600">{description}</p>}
  </div>
);

export { QuizHeader };
