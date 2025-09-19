import React, { useContext, useState } from "react";
import { EditPageContext } from "@/widgets/editPage/model/EditPageContextProvider";
import { Button } from "@/shared/ui/Button";
import { ItemTypeEnum, type LayoutItem } from "@/shared/model/quiz";
import WarningIcon from "@/icons/WarningIcon";

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
      case ItemTypeEnum.Heading:
        return "Heading";
      case ItemTypeEnum.Radio:
        return "Multiple Choice Question";
      case ItemTypeEnum.Checkbox:
        return "Checkbox Question";
      case ItemTypeEnum.Footer:
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
                  <WarningIcon />
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
