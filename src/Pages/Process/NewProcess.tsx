import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import React from 'react'
import NewProcessContainer from '../../Containers/Process/NewProcess'

const NewProcessRegister = () => {
  return (
    <DashboardWrapContainer index={'process'}>

      <InnerBodyContainer>
        <NewProcessContainer/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default NewProcessRegister
