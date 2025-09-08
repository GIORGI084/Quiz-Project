import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import React, {
  useState,
  forwardRef,
  type HTMLAttributes,
  useContext,
  useEffect,
} from "react";
import { EditableInput } from "@/shared/ui/Editables/EditableInput";
import { Editabletitle } from "@/features/quiz/ui/editableTitle";
import { EditPageContext } from "@/widgets/editPage/model/EditPageContextProvider";
import type {
  LayoutItem,
  Question,
  QuestionInputTypes,
  Heading as HeadingState,
  QuestionState,
} from "@/shared/model/quiz";
import { EditableHeading } from "@/shared/ui/Editables/EditableHeading";

type ItemState = QuestionState | HeadingState;

type QuestionProps = {
  questionId: string;
} & HTMLAttributes<HTMLDivElement>;

const Question = forwardRef<HTMLDivElement, QuestionProps>(function Question(
  { questionId, ...rest },
  ref
) {
  const [item, setItem] = useState<ItemState>({
    id: crypto.randomUUID(),
    title: "Add your question here",
    type: "radio",
    options: [],
  } as QuestionState);

  const context = useContext(EditPageContext);

  useEffect(() => {
    const quizLayout = context?.quizLayout || [];
    console.log("quizLayout:", quizLayout);
    const found = quizLayout.find(
      (layoutItem: LayoutItem) => layoutItem.id === questionId
    );
    console.log("Found item:", found);
    if (!found) {
      return;
    }

    if (found.type === "heading") {
      setItem(found as HeadingState);
    } else {
      setItem(found as QuestionState);
    }
  }, [questionId, context?.quizLayout]);

  const updateQuizLayout = (updatedItem: ItemState) => {
    if (context?.setQuizLayout) {
      const updatedLayout = context.quizLayout.map((layoutItem: LayoutItem) =>
        layoutItem.id === questionId ? updatedItem : layoutItem
      );
      context.setQuizLayout(updatedLayout);
    }
  };

  const handleHeadingTextChange = (newText: string) => {
    const updatedItem = { ...item, text: newText } as HeadingState;
    setItem(updatedItem);
    updateQuizLayout(updatedItem);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || item.type === "heading") return;

    const questionItem = item as QuestionState;
    const items = Array.from(questionItem.options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItem = {
      ...questionItem,
      options: items,
    };
    setItem(updatedItem);
    updateQuizLayout(updatedItem);
  };

  const handleEditOption = (optionId: string, newText: string) => {
    if (item.type === "heading") return;

    const questionItem = item as QuestionState;
    const updatedItem = {
      ...questionItem,
      options: questionItem.options.map((opt) =>
        opt.id === optionId ? { ...opt, text: newText } : opt
      ),
    };
    setItem(updatedItem);
    updateQuizLayout(updatedItem);
  };

  const handleDeleteOption = (optionId: string) => {
    if (item.type === "heading") return;

    const questionItem = item as QuestionState;
    const updatedItem = {
      ...questionItem,
      options: questionItem.options.filter((opt) => opt.id !== optionId),
    };
    setItem(updatedItem);
    updateQuizLayout(updatedItem);
  };

  const handleToggleCorrect = (optionId: string) => {
    if (item.type === "heading") return;

    const questionItem = item as QuestionState;
    const updatedItem = {
      ...questionItem,
      options: questionItem.options.map((opt) => {
        if (questionItem.type === "radio") {
          return { ...opt, isCorrect: opt.id === optionId };
        } else {
          return opt.id === optionId
            ? { ...opt, isCorrect: !opt.isCorrect }
            : opt;
        }
      }),
    };
    setItem(updatedItem);
    updateQuizLayout(updatedItem);
  };

  const handleAddOption = () => {
    if (item.type === "heading") return;

    const questionItem = item as QuestionState;
    const newOption = {
      id: `opt${Date.now()}`,
      text: "New option",
      isCorrect: false,
    };
    const updatedItem = {
      ...questionItem,
      options: [...questionItem.options, newOption],
    };
    setItem(updatedItem);
    updateQuizLayout(updatedItem);
  };

  const handleTypeChange = (newType: QuestionInputTypes) => {
    if (item.type === "heading" || newType === "heading") return;

    const questionItem = item as QuestionState;
    const updatedItem = {
      ...questionItem,
      type: newType,
      options:
        newType === "radio"
          ? questionItem.options.map((opt, index) => ({
              ...opt,
              isCorrect:
                index === 0 && !questionItem.options.some((o) => o.isCorrect)
                  ? true
                  : questionItem.options.filter((o) => o.isCorrect)[0]?.id ===
                    opt.id,
            }))
          : questionItem.options,
    };
    setItem(updatedItem);
    updateQuizLayout(updatedItem);
  };

  const handleTitleChange = (newTitle: string) => {
    if (item.type === "heading") return;

    const questionItem = item as QuestionState;
    const updatedItem = {
      ...questionItem,
      title: newTitle,
    };
    setItem(updatedItem);
    updateQuizLayout(updatedItem);
  };

  if (item.type === "heading") {
    const headingItem = item as HeadingState;
    return (
      <div className="w-full flex justify-around" ref={ref} {...rest}>
        <div className="w-full max-w-2xl p-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <EditableHeading
              text={headingItem.text}
              onTextChange={handleHeadingTextChange}
            />
          </div>
        </div>
      </div>
    );
  }

  const questionItem = item as QuestionState;
  return (
    <div className="w-full flex justify-around" ref={ref} {...rest}>
      <div className="w-full max-w-2xl p-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <Editabletitle
              title={questionItem.title}
              settitle={handleTitleChange}
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Type:</span>
              <select
                value={questionItem.type}
                onChange={(e) =>
                  handleTypeChange(e.target.value as QuestionInputTypes)
                }
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="text">Text</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            {questionItem.type !== "text" ? (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="options">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {questionItem.options.map((option, index) => (
                        <Draggable
                          key={option.id}
                          draggableId={option.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <EditableInput
                                option={option}
                                index={index}
                                type={questionItem.type}
                                onEdit={handleEditOption}
                                onDelete={handleDeleteOption}
                                onToggleCorrect={handleToggleCorrect}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <textarea
                className={`w-full bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200 resize-none overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
            )}
          </div>
          {questionItem.type !== "text" && (
            <button
              onClick={handleAddOption}
              className="w-full py-2 px-3 border border-dashed border-gray-300 rounded text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              Add New Option
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
Question.displayName = "Question";

export { Question };
