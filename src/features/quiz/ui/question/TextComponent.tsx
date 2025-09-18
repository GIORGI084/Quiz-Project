import React, { forwardRef, type HTMLAttributes } from "react";
import { EditableText } from "@/shared/ui/editables/ui/EditableText";
import type { Heading, Footer } from "@/shared/model/quiz";
import { ItemType } from "@/shared/model/quiz";

type TextComponentProps = {
  element: Heading | Footer;
  setActiveElement: (questionId: string) => void;
  onTextChange: (newText: string) => void;
} & HTMLAttributes<HTMLDivElement>;

const TextComponent = forwardRef<HTMLDivElement, TextComponentProps>(
  ({ element, onTextChange, setActiveElement, ...rest }, ref) => {
    const isFooter = element.type === ItemType.Footer;

    return (
      <div
        className="w-full flex justify-around"
        ref={ref}
        {...rest}
        onClick={() => setActiveElement(element.id)}
      >
        <div className="w-full max-w-2xl p-4">
          <div
            className={`bg-white rounded-lg border border-gray-200 ${
              isFooter ? "p-3" : "p-6"
            }`}
          >
            <EditableText
              text={element.text}
              onTextChange={onTextChange}
              className={isFooter ? "text-gray-500 text-xs font-normal" : ""}
            />
          </div>
        </div>
      </div>
    );
  }
);

TextComponent.displayName = "TextComponent";

export { TextComponent };
