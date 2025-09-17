export const LoadingSpinner = ({
  message = "Loading...",
}: {
  message?: string;
}) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-lg">{message}</div>
  </div>
);
