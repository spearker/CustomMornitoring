import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import React from 'react'
import BasicRawMaterialContainer from '../../Containers/Basic/BasicRawMaterialContainer'

const BasicRawMaterial = () => {
  return (
    <DashboardWrapContainer index={'basic'}>
      <InnerBodyContainer>
        <BasicRawMaterialContainer/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default BasicRawMaterial
