import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DuedateKPIContainer from "../../Containers/KPI/DuedateKPI";

const DuedateKPI = () => {
    return(
        <DashboardWrapContainer index={'kpi'}>
            <InnerBodyContainer>
                <DuedateKPIContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default DuedateKPI
