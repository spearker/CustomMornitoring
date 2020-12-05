import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import React from 'react'
import ReadyTimeStatisticsContainer from '../../Containers/PM_Statistics/ReadyTimeStatisticsContiner'
import ReadyTimeErrorAnalysisContainer from '../../Containers/PM_Analysis/ReadyTimeErrorAnalysis'

const ReadyTimeStatics = () => {
  return (
    <DashboardWrapContainer index={'analysis'}>
      <InnerBodyContainer>
        {/*<ReadyTimeStatisticsContainer/>*/}
        <ReadyTimeErrorAnalysisContainer/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default ReadyTimeStatics
