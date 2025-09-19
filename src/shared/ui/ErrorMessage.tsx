export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-lg text-gray-600">{message}</div>
  </div>
);
