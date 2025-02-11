import React from "react";
import Text from "./text";

interface ButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
  }
  
  const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    className = "",
    disabled = false,
    icon,
  }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed max-w-40 ${className}`}
      >
        {icon && <span>{icon}</span>}
        <Text>{label}</Text>
      </button>
    );
  };
  
  export default Button ;