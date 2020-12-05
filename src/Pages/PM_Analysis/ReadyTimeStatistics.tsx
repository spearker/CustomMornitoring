import React, {useEffect} from 'react'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import PMReadyTimeContainer from '../../Containers/Statistics/PMReadytimeContiner'


const ReadyTimeStatistics = () => {

  useEffect(() => {

  }, [])

  return (
    <DashboardWrapContainer index={'statistics'}>

      <InnerBodyContainer>
        <PMReadyTimeContainer/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}


export default ReadyTimeStatistics
