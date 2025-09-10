import React, { type FC } from "react";
import type { Heading } from "@/shared/model/quiz";

interface HeadingItemProps {
  heading: Heading;
}

const HeadingItem: FC<HeadingItemProps> = ({ heading }) => {
  return (
    <div className=" pb-2">
      <h2 className="text-xl font-semibold text-gray-800 leading-tight">
        {heading.text}
      </h2>
    </div>
  );
};

export { HeadingItem };
