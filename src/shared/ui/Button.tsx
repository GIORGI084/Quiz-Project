import React, { type FC } from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "primary" | "secondary";
  className?: string;
  href?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = "secondary",
  className = "",
  href = "",
}) => {
  const baseStyles =
    "flex items-center justify-center p-[10px] px-[50px] py-2 text-sm font-medium rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const typeStyles = {
    primary:
      "text-white bg-blue-600 border border-transparent hover:bg-blue-700 disabled:hover:bg-blue-600",
    secondary:
      "text-gray-700 bg-gray-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 disabled:hover:bg-gray-50 disabled:hover:text-gray-700",
  };

  const finalClassName = `${baseStyles} ${typeStyles[type]} ${className}`;

  return (
    <>
      {href ? (
        <Link onClick={onClick} className={finalClassName} href={href}>
          {children}
        </Link>
      ) : (
        <button onClick={onClick} className={finalClassName}>
          {children}
        </button>
      )}
    </>
  );
};

export { Button };
