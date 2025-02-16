import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "Enter text",
  size = "md",
  value,
  onChange,
  className = "",
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${sizeClasses[size]} ${className}`}
    />
  );
};

export default Input;
