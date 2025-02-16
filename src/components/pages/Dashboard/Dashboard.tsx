// import React from 'react'

import Text from "../../ui/text"
import { Routes } from "../PageRouter/route"

type Props = {
    handleroutechange:(routename:string)=> void
}

function Dashboard({
    handleroutechange
}: Props) {
  return (
    <div className="h-screen p-4 flex flex-col">
        <Text size="xl" weight="bold" >Dashboard</Text>
        <Text size="lg"onClick={()=>handleroutechange(Routes.TASKS)}>Go to taskpage</Text>
    </div>
  )
}

export default Dashboard