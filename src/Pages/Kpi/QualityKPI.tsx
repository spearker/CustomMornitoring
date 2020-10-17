import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import QualityKPIContainer from "../../Containers/KPI/QualityKPI";

const QualityKPI = () => {
    return(
        <DashboardWrapContainer index={'kpi'}>
            <InnerBodyContainer>
               <QualityKPIContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
        )
}

export default QualityKPI
