import { useState } from "react";
import Text from "../../ui/text";
import Button from "../../ui/button";
import Card from "./components/TaskCard";
import Modal from "./components/Taskmodal";
import Input from "../../ui/input";
import { Plus } from "lucide-react";

// Defining Task type
interface Task {
  title: string;
  duration: string;
  date: string;
  priority: "low" | "medium" | "high";
}

const TaskPage = () => {
  // States with explicit types
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [tasks, setTasks] = useState<Task[]>([]);

  // handleAddTask function with explicit return type
  const handleAddTask = (): void => {
    if (taskTitle.trim() !== "") {
      const newTask: Task = { title: taskTitle, duration, date: dueDate, priority };
      setTasks([...tasks, newTask]);
      setTaskTitle("");
      setDuration("");
      setDueDate("");
      setPriority("low");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="h-screen flex flex-col p-4 ">
      <div className="flex justify-between items-center mb-6">
        <Text size="xl" weight="bold" className="text-left text-3xl">
          Hello, John Doe
        </Text>
        <Button 
          label="Add Task" 
          icon={<Plus/>}
          onClick={() => setIsModalOpen(true)} 
        />
      </div>
      <div className="w-full mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {tasks.map((task, index) => (
            <Card
              key={index}
              title={task.title}
              duration={task.duration}
              date={task.date}
              priority={task.priority}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Text size="lg" weight="bold" className="mb-4">
          Add a New Task
        </Text>
        <Input
          value={taskTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full mb-4"
        />
        <Input
          value={duration}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDuration(e.target.value)}
          placeholder="Enter task duration"
          className="w-full mb-4"
        />
        <Input
          type="date"
          value={dueDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
          className="w-full mb-4"
        />
        <select
          value={priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value as "low" | "medium" | "high")}
          className="w-full mb-4"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="flex justify-end space-x-2">
          <Button label="Cancel" onClick={() => setIsModalOpen(false)} />
          <Button label="Add" onClick={handleAddTask} />
        </div>
      </Modal>
    </div>
  );
};

export default TaskPage;

