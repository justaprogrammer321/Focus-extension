// import React from 'react'
import { useState } from 'react';
import Blockedpages from '../Blockpages/Blockpages'
import Dashboard from '../Dashboard/Dashboard';



function Pageroutes() {
    const [routename,setRouteName]=useState<string>("/dashboard")
    const handleroutechange=(route:string)=>{
        setRouteName(route)
    }

  return (
    <div className='max-w-screen-xl min-h-screen w-[1280px]'>
        { routename=="/dashboard" &&
            <Dashboard handleroutechange={handleroutechange}/>
        }
        { routename=="/blocked" &&
            <Blockedpages handleroutechange={handleroutechange}/>
        }
    </div>
  )
}

export default Pageroutes;