import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import React from 'react'
import ReleaseRegisterContainer_V2 from '../../Containers/NewStock/ReleaseRegisterV2'


interface Props {
  match: any;
  chilren: string;
}

const ReleaseRegister_V2 = ({match}: Props) => {
  return (
    <DashboardWrapContainer index={'stock'}>
      <InnerBodyContainer>
        <ReleaseRegisterContainer_V2 match={match}/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default ReleaseRegister_V2
