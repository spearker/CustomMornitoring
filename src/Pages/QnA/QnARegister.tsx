import React from 'react'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import QnARegisterContainer from '../../Containers/QnA/QnARegister'

const QnARegister = () => {
  return (
    <DashboardWrapContainer index={'barcode'}>

      <InnerBodyContainer>
        <QnARegisterContainer/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default QnARegister
