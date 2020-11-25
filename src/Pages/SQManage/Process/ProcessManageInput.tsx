import React from 'react'
import InnerBodyContainer from '../../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../../Containers/DashboardWrapContainer'
import MoldManageInputContainer from '../../../Containers/SQManage/Mold/MoldManageInputContainer'
import ProcessManageInputContainer from '../../../Containers/SQManage/Process/ProcessManageInputContainer'

interface Props {
  match: any;
  chilren: string;
}

const ProcessManageInput = ({match}: Props) => {
  return (
    <DashboardWrapContainer index={'project'}>

      <InnerBodyContainer>
        <ProcessManageInputContainer match={match}/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default ProcessManageInput
