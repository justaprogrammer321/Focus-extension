import {Link2Off, ListIcon, LucideLayoutDashboard, SettingsIcon } from "lucide-react"
import { Routes } from "../../pages/PageRouter/route"

type Props = {
  handleroutechange:(routename:string)=> void
}

function SideNavbar({
  handleroutechange
}:Props) {
  return (
    <div className="w-20 h-full border-r-2 flex flex-col justify-between items-stretch">
      <div className="flex w-full items-center justify-center ">
        <img className="p-2 rounded-full" src="/images/logo.png" alt="focus-logo" />
      </div>
      <div className="w-full items-center justify-center gap-4 flex flex-col">
        <LucideLayoutDashboard 
          onClick={()=>handleroutechange(Routes.DASHBOARD)}
        />
        <ListIcon 
          onClick={()=>handleroutechange(Routes.TASKS)}
        />
        <Link2Off 
          onClick={()=>handleroutechange(Routes.BLOCKED)} 
        />
      </div>
      <div className="w-full items-center justify-center flex p-4">
        <SettingsIcon/>
      </div>
    </div>
  )
}

export default SideNavbar