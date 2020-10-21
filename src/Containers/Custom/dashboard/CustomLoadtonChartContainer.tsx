import React from 'react'
import Styled from "styled-components";
import CustomDashboardLoadtonChart from "../../../Components/Custom/dashboard/CustomDashboardLoadtonChart";

const CustomLoadtonChartContainer: React.FunctionComponent = () => {
  return (
      <DashboardWrapDiv>
        <CustomDashboardLoadtonChart/>
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
