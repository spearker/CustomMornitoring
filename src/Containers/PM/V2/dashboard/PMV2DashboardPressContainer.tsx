import React from 'react'
import PMV2DashboardContentContainer from './PMV2DashboardContentContainer'

interface Props {
  match: any
}


const PMV2DashboardPressContainer: React.FunctionComponent<Props> = ({ match }) => {
  return (
    <div>
      <PMV2DashboardContentContainer id={match.params.id}/>
    </div>
  )
}

export default PMV2DashboardPressContainer
