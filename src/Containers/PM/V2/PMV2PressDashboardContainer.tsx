import React from 'react'
import PMV2DashboardHeader from '../../../Components/PM/V2/dashboard/PMV2DashboardHeader'
import PMV2DashboardContent from '../../../Components/PM/V2/dashboard/PMV2DashboardContent'

const PMV2PressDashboardContainer: React.FunctionComponent = () => {
  return (
    <div>
      <PMV2DashboardHeader title={'대형 2번 프레스 (800t)'}/>
      <PMV2DashboardContent/>
    </div>
  )
}

export default PMV2PressDashboardContainer
