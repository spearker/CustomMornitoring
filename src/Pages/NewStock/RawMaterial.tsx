import React from 'react'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import NewRawMaterialContainer from '../../Containers/Stock/NewRawMaterialContainer'
import NewRawMaterialContainerV2 from '../../Containers/NewStock/RawMaterialContainterV2'

const NewRawMaterial_V2: React.FunctionComponent = () => {

  return (
    <DashboardWrapContainer index={'stock'}>
      <InnerBodyContainer>
        <NewRawMaterialContainerV2/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default NewRawMaterial_V2
