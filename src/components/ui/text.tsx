import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  weight?: "light" | "normal" | "medium" | "bold";
  className?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  size = "md",
  weight = "normal",
  className = "",
  ...rest
}) => {
   const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  };

  return (
    <p
      className={`${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
      {...rest} // Spread the remaining props here
    >
      {children}
    </p>
  );
};

export default Text;
