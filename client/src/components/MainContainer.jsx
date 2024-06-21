import React from 'react'
import CardContainer from './ItemsContainer'
import Toolbar from './Toolbar'
function MainContainer() {
  return (
    <div className='w-full '>
      <Toolbar />
      <CardContainer />
    </div>
  )
}

export default MainContainer