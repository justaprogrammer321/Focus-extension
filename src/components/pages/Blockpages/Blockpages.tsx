import Button from "../../ui/button";
import Input from "../../ui/input";
import { useState, useEffect } from "react";
import { Plus, ArrowLeft, Trash } from "lucide-react";
import Text from "../../ui/text";

type Props = {
  handleroutechange:(routename:string)=> void
}

function Blockedpages({
  handleroutechange
}:Props) {
  const [text, setText] = useState("");
  const [websites, setWebsites] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.local.get("blockedsites", (item) => {
      if (chrome.runtime.lastError) {
        console.error("Storage error:", chrome.runtime.lastError);
      } else {
        const blockedsites = JSON.parse(item.blockedsites || "[]");
        setWebsites(blockedsites);
      }
    });
  }, []);

  const addblocksite = (text: string) => {
    if (!text.trim()) return;

    const newWebsites = [...websites, text];
    setWebsites(newWebsites);

    chrome.storage.local.set({ blockedsites: JSON.stringify(newWebsites) }, () => {
      if (chrome.runtime.lastError) {
        console.error("Storage error:", chrome.runtime.lastError);
      } else {
        console.log("Data saved successfully!");
      }
    });

    setText("");
  };

  const deleteblockedsite = (website: string) => {
    const updatedWebsites = websites.filter(item => item !== website);
    setWebsites(updatedWebsites); 
  
    chrome.storage.local.set({ blockedsites: JSON.stringify(updatedWebsites) }, () => {
      if (chrome.runtime.lastError) {
        console.error("Storage error:", chrome.runtime.lastError);
      } else {
        console.log("Data updated successfully!");
      }
    });
  };
  
  return (
    <div className="h-screen flex flex-col p-4 justify-center">

      <div className="h-12 flex items-center gap-4 border-b ">
        <ArrowLeft className="cursor-pointer" onClick={()=>handleroutechange("/dashboard")} />
        <Text size="xl" weight="bold">Block Pages</Text>
      </div>

      <div className="p-4 flex flex-col gap-4 border-b">
        <Text size="lg">Enter the site you want to block</Text>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Type here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-gray-300 flex-1"
          />
          <Button icon={<Plus />} label="Add" onClick={() => addblocksite(text)} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {websites.length === 0 ? (
          <Text className="text-gray-500 text-center">No blocked websites</Text>
        ) : (
          websites.map((website, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 group transition-all duration-200"
            >
              <span className="text-gray-700">{website}</span>
              <button
                onClick={()=>deleteblockedsite(website)}
                className="text-gray-400 hover:text-red-600 focus:outline-none"
                aria-label={`Delete ${website}`}
              >
                <Trash className="text-lg" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Blockedpages;
