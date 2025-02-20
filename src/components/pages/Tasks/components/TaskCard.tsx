import React, { useState } from "react";
import Text from "../../../ui/text";
import { PauseCircle, PlayCircle, Trash } from "lucide-react";
import { sendDataToBackground } from "../../../../utils/messagesender";

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
  const [start,setstart]=useState<boolean>(false)
  const handletaskstart=()=>{
    sendDataToBackground()
    setstart(true)
  }

  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-xl border-gray-300">
      <div className="flex  justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-gray-800">{title}</Text>
        <div className="flex gap-2 items-center">
          <span className={`px-2 py-1 text-xs font-bold text-white rounded ${priorityColors[priority]}`}>
            {priority.toUpperCase()}
          </span>
          <Trash className="hover:text-red-700" />
        </div>
      </div>
      <div>
        <Text className="text-sm text-gray-600">Duration: {duration}</Text>
        <Text className="text-sm text-gray-600">Due Date: {date}</Text>
      </div>
      <div className=" flex w-full items-center justify-end">
        {start ? <PauseCircle className="size-10" strokeWidth={1} onClick={()=>setstart(false)} />:
                <PlayCircle className="size-10" strokeWidth={1} onClick={()=>handletaskstart()} /> }
      </div>
    </div>
  );
};

export default Card;
