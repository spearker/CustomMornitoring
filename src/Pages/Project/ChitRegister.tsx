import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import React from 'react'
import ChitRegisterContainer from '../../Containers/Project/ChitRegister'

const ChitRegister = ({match}: any) => {
  return (
    <DashboardWrapContainer index={'project'}>

      <InnerBodyContainer>
        <ChitRegisterContainer match={match}/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default ChitRegister
