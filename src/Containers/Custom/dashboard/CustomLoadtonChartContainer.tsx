import React from 'react'
import Styled from 'styled-components'
import CustomDashboardLoadtonChart from '../../../Components/Custom/dashboard/CustomDashboardLoadtonChart'
import CustomAnalysisDashboardLoadtonChart
    from '../../../Components/Custom/dashboard/CustomAnalysisDashboardLoadtonChart'

interface Props {
    match: any
}


const CustomLoadtonChartContainer: React.FunctionComponent<Props> = ({match}) => {

    return (
        <DashboardWrapDiv>
            {/*<CustomDashboardLoadtonChart id={match.params.press}/>*/}
            <CustomAnalysisDashboardLoadtonChart id={match.params.press}/>
        </DashboardWrapDiv>
    )

}

const DashboardWrapDiv = Styled.div`
display: flex;
width: 100%;
min-height: 100vh;
min-width: 1180px;
background-image: linear-gradient(to right, #202e4a 0%, #0f1722 100%);
position: relative;
`


export default CustomLoadtonChartContainer
