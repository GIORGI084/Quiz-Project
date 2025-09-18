import React from "react";
import { ItemType } from "@/shared/model/quiz";

interface DisplayFootersProps {
  footers: Array<{ id: string; text: string; type: ItemType.Footer }>;
}

const DisplayFooters: React.FC<DisplayFootersProps> = ({ footers }) => {
  if (footers.length === 0) return null;

  return (
    <div>
      {footers.map((footer) => (
        <p
          key={footer.id}
          className="text-sm text-gray-500 italic px-2 py-1 text-center"
        >
          {footer.text}
        </p>
      ))}
    </div>
  );
};

export { DisplayFooters };
