// import { useState } from "react";
// import { somefunctions } from "../chrome/index";
import Pageroutes from "./components/pages/PageRouter/Pageroutes";
import './index.css';


const Options = () => {
  // const [tabs, setTabs] = useState<Array<chrome.tabs.Tab>>([]); // Fixed type
  // const [alltabs,setallTabs]=useState<chrome.tabs.Tab[]>([])

  // async function showalltabs() {
  //   try{
  //     const tab=await somefunctions.getalltabs();
  //     if(tab) setallTabs(tab);
  //   }
  //   catch(error){
  //     console.error("Error",error)
  //   }
  // }

  // async function handleGetTab() {
  //   try {
  //     const tab = await somefunctions.getCurrentTab();
  //     console.log("Current Tab Info:", tab);
  //     if (tab) setTabs(tab); 
  //   } catch (error) {
  //     console.error("Error fetching current tab:", error);
  //   }
  // }

  return (
    <div className=" w-full min-h-screen h-screen flex items-center justify-center ">
      {/* <h1 className="text-xl font-bold">Options Page</h1> */}
      {/* <p>Customize extension settings here.</p> */}
      <Pageroutes/>
      {/* <button onClick={handleGetTab}>Click me to see tabs</button> */}
      
      {/* {tabs.length > 0 && (
        tabs.map((tab) => (
          <div key={tab.id}> 
            <p>{tab.url}</p>
          </div>
        ))
      )} */}


      {/* {alltabs.length >0 &&(
        <h2>{alltabs[]</h2>
      )
      } */}
    </div>
  );
};

export default Options;
