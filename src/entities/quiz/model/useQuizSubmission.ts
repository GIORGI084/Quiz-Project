import { useCallback } from "react";

export const useQuizSubmission = () => {
  const handleSubmit = useCallback(
    (answers: Record<string, string | string[]>) => {
      console.log("Quiz submitted with answers:", answers);
      alert("Quiz submitted successfully!");
    },
    []
  );

  return { handleSubmit };
};
