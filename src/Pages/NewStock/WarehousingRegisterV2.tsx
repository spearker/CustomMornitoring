import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import React from 'react'
import WarehousingRegisterContainer_V2 from '../../Containers/NewStock/WarehousingRegisterV2'

interface Props {
  match: any;
  chilren: string;
}

const WarehousingRegister_V2 = ({match}: Props) => {
  return (
    <DashboardWrapContainer index={'stock'}>
      <InnerBodyContainer>
        <WarehousingRegisterContainer_V2 match={match}/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default WarehousingRegister_V2
