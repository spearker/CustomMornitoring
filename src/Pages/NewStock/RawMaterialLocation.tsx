import React from 'react'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import NewRawMaterialLocationContainerV2 from '../../Containers/NewStock/RawMaterialLocationContainterV2'

const NewRawMaterialLocation_V2: React.FunctionComponent = () => {

  return (
    <DashboardWrapContainer index={'stock'}>
      <InnerBodyContainer>
        <NewRawMaterialLocationContainerV2/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default NewRawMaterialLocation_V2
