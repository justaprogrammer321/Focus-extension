import { useEffect, useState } from "react";
import Text from "../../ui/text";
import Button from "../../ui/button";
import Card from "./components/TaskCard";
import Modal from "./components/Taskmodal";
import Input from "../../ui/input";
import { Plus } from "lucide-react";
import axios from "axios";
import { removePunctuation_Stopwords_Verbs } from "../../../utils/textCleaner";

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

  useEffect(() => {
    // Creating IndexedDB if not created else simply access it
    const request = window.indexedDB.open("Focus-data", 1);
  
    request.onupgradeneeded = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;

      //storing the schema of the tasks objectstore
  
      if (!db.objectStoreNames.contains("tasks")) {
        const objectStore = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
  
        objectStore.createIndex("title", "title", { unique: false });
        objectStore.createIndex("duration", "duration", { unique: false });
        objectStore.createIndex("date", "date", { unique: false });
        objectStore.createIndex("priority", "priority", { unique: false });
  
        console.log("Object store and indexes created");
      }
    };
  
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      console.log("Database opened successfully");

      // get all tasks from the tasks datastore
      function getAllTasks(db: IDBDatabase) {
        const transaction = db.transaction("tasks", "readonly");
        const objectStore = transaction.objectStore("tasks");
        const requestGetTasks = objectStore.getAll();
  
        requestGetTasks.onsuccess = (event) => {
          console.log("Got all tasks:",(event.target as IDBRequest).result);
          console.table((event.target as IDBRequest).result); // Correct way to log data
          setTasks((event.target as IDBRequest).result)
        };
  
        requestGetTasks.onerror = () => {
          console.error("Error fetching tasks");
        };
      }
  
      getAllTasks(db);
    };
  
    request.onerror = () => {
      console.error("Error opening the database");
    };
  }, []);
  

  // handleAddTask function with explicit return type
  const handleAddTask = (): void => {
    if (taskTitle.trim() !== "") {
      const newTask: Task = { title: taskTitle, duration, date: dueDate, priority };
      const updatedTasks:Task[] = [...tasks, newTask];
      setTasks(updatedTasks);

      /* This is to handle generation of task keywords from task title */
      let recieved_keywords_from_api:string[]=[]
      
      const tasktitle_array=removePunctuation_Stopwords_Verbs(taskTitle)

      const generate_keywords_from_taskTitle=async()=>{
        const promises=tasktitle_array.map(async(item)=>{
                try {
                  const response=await axios.get(`https://api.datamuse.com/words?ml=${item}&max=20`)
                  const words=response.data.map((item:{word:string})=>item.word)
                  return words;
                  // recieved_keywords_from_api.push(response.data)
                  // console.log(response.data)
                } catch (error) {
                  console.error(error)
                }
              }  
          )
          // tasktitle_array.forEach((item)=>{
          //   const fetch_keywords_from_api=async()=>{
          //     try {
          //       const response=await axios.get(`https://api.datamuse.com/words?ml=${item}&max=20`)
          //       recieved_keywords_from_api.push(response.data)
          //       console.log(response.data)
          //     } catch (error) {
          //       console.error(error)
          //     }
          //   }
          //   fetch_keywords_from_api()
          // })

          const results = await Promise.all(promises);
          console.log(results)
          recieved_keywords_from_api = results.flat();
          console.log(recieved_keywords_from_api)

          chrome.storage.local.set({ taskkeywords : JSON.stringify(recieved_keywords_from_api) }, () => {
            if (chrome.runtime.lastError) {
              console.error("Storage error:", chrome.runtime.lastError);
            } else {
              console.log("Task Updated successfully!");
            }
          });
      }
      generate_keywords_from_taskTitle();

      //connect to Db to get the exsiting tasks
      let db:IDBDatabase;

      const request = window.indexedDB.open("Focus-data", 1);

      request.onsuccess = () => {
        // Create DB connection
        db = request.result as IDBDatabase;
  
        //function to add Tasks
        function addtasks(newTask:Task){
          const tasksobjectstore = db.transaction("tasks", "readwrite").objectStore("tasks");
          tasksobjectstore.add(newTask)
          console.log("Added the newTasks")
        }
      
        addtasks(newTask)
      };

      //reset the form values
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
          size="lg"
        />
        <Input
          value={duration}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDuration(e.target.value)}
          placeholder="Enter task duration"
          className="w-full mb-4"
          size="lg"
        />
        <Input
          type="date"
          value={dueDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
          className="w-full mb-4"
          size="lg"
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

