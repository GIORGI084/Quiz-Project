import React, { useContext, useState } from "react";
import { EditPageContext } from "@/widgets/editPage/model/EditPageContextProvider";
import { Button } from "@/shared/ui/Button";
import { ItemType, type LayoutItem } from "@/shared/model/quiz";

const RightSidebar = () => {
  const context = useContext(EditPageContext);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  if (!context) {
    return null;
  }

  const { selectedElementId, quizLayout, setQuizLayout, setSelectedElementId } =
    context;

  const selectedElement = selectedElementId
    ? quizLayout.find((item) => item.id === selectedElementId)
    : undefined;

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedElementId) return;

    const updatedLayout = quizLayout.filter(
      (item) => item.id !== selectedElementId
    );
    setQuizLayout(updatedLayout);

    setSelectedElementId(null);
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const getElementTypeLabel = (element: LayoutItem): string => {
    switch (element.type) {
      case ItemType.Heading:
        return "Heading";
      case ItemType.Radio:
        return "Multiple Choice Question";
      case ItemType.Checkbox:
        return "Checkbox Question";
      case ItemType.Footer:
        return "Footer";
      default:
        return "Element";
    }
  };

  const getElementTitle = (element: LayoutItem): string => {
    if ("title" in element && element.title) return element.title;
    if ("text" in element && element.text) return element.text;
    return "Untitled";
  };
  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      {selectedElementId && selectedElement && (
        <div className="space-y-4">
          <div className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {getElementTypeLabel(selectedElement)}
              </span>
              <button
                onClick={() => setSelectedElementId(null)}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            </div>
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {getElementTitle(selectedElement)}
            </h4>
          </div>
          {showDeleteConfirmation ? (
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-600 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-medium text-red-900 mb-2">
                    Delete {getElementTypeLabel(selectedElement)}
                  </h5>
                  <p className="text-sm text-red-700 mb-4">
                    Are you sure you want to delete
                    {getElementTitle(selectedElement)}? This action cannot be
                    undone.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCancelDelete}
                      type="secondary"
                      className="flex-1 !text-xs !px-2 !py-1.5 h-auto border-0 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleConfirmDelete}
                      type="primary"
                      className="flex-1 !text-xs !px-2 !py-1.5 h-auto border-0 bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-4 mt-6">
              <Button
                onClick={handleDeleteClick}
                type="secondary"
                className="w-full px-4 border-0 text-red-600 hover:text-red-700 hover:bg-red-50 bg-white"
              >
                Delete{" "}
                {selectedElement
                  ? getElementTypeLabel(selectedElement)
                  : "Element"}
              </Button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export { RightSidebar };
