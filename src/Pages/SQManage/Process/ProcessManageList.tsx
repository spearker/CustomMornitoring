import React from 'react'
import InnerBodyContainer from '../../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../../Containers/DashboardWrapContainer'
import MoldManageListContainer from '../../../Containers/SQManage/Mold/MoldManageListContainer'
import ProcessManageListContainer from '../../../Containers/SQManage/Process/ProcessManageListContainer'

const ProcessManageList: React.FunctionComponent = () => {

  return (
    <DashboardWrapContainer index={'sq'}>
      <InnerBodyContainer>
        <ProcessManageListContainer/>


      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default ProcessManageList
