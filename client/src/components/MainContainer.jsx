import React from 'react'
import CardContainer from './ItemsContainer'
import Toolbar from './Toolbar'
function MainContainer() {
  return (
    <div className='w-full dark:bg-[#3C3E8C]'>
      <Toolbar />
      <CardContainer />
    </div>
  )
}

export default MainContainer