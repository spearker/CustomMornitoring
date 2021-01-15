import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import React from 'react'
import ProductionRegisterContainer from '../../Containers/Project/ProductionRegister'

const ProductionRegister = ({match}: any) => {
  return (
    <DashboardWrapContainer index={'project'}>

      <InnerBodyContainer>
        <ProductionRegisterContainer match={match}/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default ProductionRegister
