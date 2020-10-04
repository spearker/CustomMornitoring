import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import EnergyKPIContainer from "../../Containers/KPI/EnergyKPI";

const EnergyKPI = () => {
    return(
        <DashboardWrapContainer index={'kpi'}>
            <InnerBodyContainer>
                <EnergyKPIContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default EnergyKPI
