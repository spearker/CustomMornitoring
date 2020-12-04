import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import ProductionKPIContainer from "../../Containers/NewKPI/ProductionKPI";

const NewProductionKPI = () => {
    return (
        <DashboardWrapContainer index={'kpi'}>
            <InnerBodyContainer>
                <ProductionKPIContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewProductionKPI
