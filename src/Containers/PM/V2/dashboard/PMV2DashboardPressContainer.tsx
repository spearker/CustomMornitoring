import React from 'react'
import PMV2DashboardContentContainer from './PMV2DashboardContentContainer'

interface Props {
  match: any
  location: any
}


const PMV2DashboardPressContainer: React.FunctionComponent<Props> = ({ match, location }) => {
  console.log('location', location.search.split('=')[1])
  return (
    <div>
      <PMV2DashboardContentContainer id={match.params.id} testHeader={location.search.split('=')[1]}/>
    </div>
  )
}

export default PMV2DashboardPressContainer
