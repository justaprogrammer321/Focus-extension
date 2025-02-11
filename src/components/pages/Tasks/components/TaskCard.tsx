import React from "react";
import Text from "../../../ui/text";

interface CardProps {
  title: string;
  duration: string;
  date: string;
  priority: "high" | "medium" | "low";
}

const priorityColors = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

const Card: React.FC<CardProps> = ({ title, duration, date, priority }) => {
  return (
    <div className="p-4 bg-white rounded-xl border-gray-300">
      <div className="flex justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-gray-800">{title}</Text>
        <span className={`px-2 py-1 text-xs font-bold text-white rounded ${priorityColors[priority]}`}>
          {priority.toUpperCase()}
        </span>
      </div>
      <Text className="text-sm text-gray-600">Duration: {duration}</Text>
      <Text className="text-sm text-gray-600">Due Date: {date}</Text>
    </div>
  );
};

export default Card;
