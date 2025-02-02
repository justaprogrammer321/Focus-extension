// import React from 'react'

import Text from "../../ui/text"

type Props = {
    handleroutechange:(routename:string)=> void
}

function Dashboard({
    handleroutechange
}: Props) {
  return (
    <>
        <Text size="xl" >Dashboard</Text>
        <Text size="lg"onClick={()=>handleroutechange("/blocked")}>Dashboard</Text>
    </>
  )
}

export default Dashboard