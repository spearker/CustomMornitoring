import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import React from 'react'
import ProcessRegisterContainer from '../../Containers/Process/Register'

const ProcessRegister = ({match}) => {
  return (
    <DashboardWrapContainer index={'process'}>

      <InnerBodyContainer>
        <ProcessRegisterContainer match={match}/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default ProcessRegister
