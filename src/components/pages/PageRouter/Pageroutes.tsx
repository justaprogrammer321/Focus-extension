import { useState } from 'react';
import { Routes } from './route';
import SideNavbar from '../../layout/SideNav/SideNavbar';
import { TasksPage,BlockedPages,Dashboard, } from '..';


function Pageroutes() {
    const [routename,setRouteName]=useState<string>("/taskpage")
    const handleroutechange=(route:string)=>{
        setRouteName(route)
    }

  return (
    <div className='min-h-screen w-full flex'>
      <div className='h-screen'>
        <SideNavbar handleroutechange={handleroutechange}/>
      </div>
      <div className='bg-background w-full h-full'>
        { routename==Routes.DASHBOARD && <Dashboard handleroutechange={handleroutechange}/>}
        { routename==Routes.BLOCKED && <BlockedPages handleroutechange={handleroutechange}/>}
        { routename==Routes.TASKS && <TasksPage />}
      </div>
    </div>
  )
}

export default Pageroutes;