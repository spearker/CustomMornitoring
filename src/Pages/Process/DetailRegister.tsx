import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import React from 'react'
import ProcessDetailRegisterContainer from '../../Containers/Process/DetailRegister'

const ProcessDetailRegister = ({match}: any) => {
  return (
    <DashboardWrapContainer index={'process'}>
      <InnerBodyContainer>
        <ProcessDetailRegisterContainer match={match}/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default ProcessDetailRegister
