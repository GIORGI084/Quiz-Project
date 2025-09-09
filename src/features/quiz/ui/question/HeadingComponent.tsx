import React, { forwardRef, type HTMLAttributes } from "react";
import { EditableHeading } from "@/shared/ui/Editables/ui/EditableHeading";
import type { Heading as HeadingState } from "@/shared/model/quiz";

type HeadingComponentProps = {
  heading: HeadingState;
  onTextChange: (newText: string) => void;
} & HTMLAttributes<HTMLDivElement>;

const HeadingComponent = forwardRef<HTMLDivElement, HeadingComponentProps>(
  ({ heading, onTextChange, ...rest }, ref) => {
    return (
      <div className="w-full flex justify-around" ref={ref} {...rest}>
        <div className="w-full max-w-2xl p-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <EditableHeading text={heading.text} onTextChange={onTextChange} />
          </div>
        </div>
      </div>
    );
  }
);

HeadingComponent.displayName = "HeadingComponent";

export { HeadingComponent };
