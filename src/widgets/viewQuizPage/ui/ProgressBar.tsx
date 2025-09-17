interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => (
  <div className="mb-8">
    <div className="bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
    <p className="text-sm text-gray-600 mt-2 text-center">
      {current} of {total} questions
    </p>
  </div>
);
