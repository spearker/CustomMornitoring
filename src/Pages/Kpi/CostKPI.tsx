import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import CostKPIContainer from "../../Containers/KPI/CostKPI";

const CostKPI = () => {
    return(
        <DashboardWrapContainer index={'kpi'}>
            <InnerBodyContainer>
                <CostKPIContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CostKPI
