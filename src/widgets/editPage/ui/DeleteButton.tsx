import React, { useState } from "react";
import { deleteQuiz } from "@/entities/quiz/model/handleStorage";
import { Button } from "@/shared/ui/Button";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: string;
  onDeleteSuccess?: () => void;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    deleteQuiz(id);
    router.push("/");
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-2 justify-end">
          <Button onClick={handleCancel} type="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            type="primary"
            className="bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600"
          >
            Comfrim Delete
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={handleDeleteClick}
      type="secondary"
      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
    >
      Delete
    </Button>
  );
};

export { DeleteButton };
