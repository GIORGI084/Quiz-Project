import React from "react";

interface HeadingItem {
  id: string;
  text: string;
  type: "heading";
}

interface DisplayHeadingsProps {
  headings: HeadingItem[];
}

const DisplayHeadings: React.FC<DisplayHeadingsProps> = ({ headings }) => {
  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 space-y-3">
      {headings.map((heading) => (
        <div key={heading.id} className=" pb-2">
          <h2 className="text-xl font-semibold text-gray-800 leading-tight">
            {heading.text}
          </h2>
        </div>
      ))}
    </div>
  );
};

export { DisplayHeadings };
