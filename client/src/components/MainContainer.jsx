import React from 'react'
import CardContainer from './ItemsContainer'
import Toolbar from './Toolbar'
function MainContainer() {
  return (
    <div className='w-full bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-[#3C3E8C] dark:to-[#3C3E8C]'>
      <Toolbar />
      <CardContainer />
    </div>
  )
}

export default MainContainer