import React from 'react'
import InnerBodyContainer from '../../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../../Containers/DashboardWrapContainer'
import DefectiveRegisterContainer from '../../../Containers/Project/DefectiveRegister'
import MoldManageInputContainer from '../../../Containers/SQManage/Mold/MoldManageInputContainer'

interface Props {
  match: any;
  chilren: string;
}

const MoldManageInput = ({match}: Props) => {
  return (
    <DashboardWrapContainer index={'project'}>

      <InnerBodyContainer>
        <MoldManageInputContainer match={match}/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default MoldManageInput
