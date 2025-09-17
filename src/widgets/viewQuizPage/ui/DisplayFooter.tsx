import React from "react";

interface DisplayFootersProps {
  footers: Array<{ id: string; text: string; type: "footer" }>;
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
