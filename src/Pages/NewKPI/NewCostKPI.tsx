import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import CostKPI from "../../Containers/NewKPI/CostKPI";

const NewCostKPI = () => {
    return (
        <DashboardWrapContainer index={'kpi'}>
            <InnerBodyContainer>
                <CostKPI />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewCostKPI
