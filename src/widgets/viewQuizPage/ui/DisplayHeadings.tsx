import React from "react";
import { HeadingItem } from "@/widgets/viewQuizPage/ui/HeadingItem";
import type { Heading } from "@/shared/model/quiz";
interface DisplayHeadingsProps {
  headings: Heading[];
}

const DisplayHeadings: React.FC<DisplayHeadingsProps> = ({ headings }) => {
  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 space-y-3">
      {headings.map((elm) => (
        <HeadingItem heading={elm} key={elm.id} />
      ))}
    </div>
  );
};

export { DisplayHeadings };
