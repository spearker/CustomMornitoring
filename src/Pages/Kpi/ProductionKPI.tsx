import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import ProductionKPIContainer from "../../Containers/KPI/ProductionKPI";

const ProductionKPI = () => {
    return(
        <DashboardWrapContainer index={'kpi'}>
            <InnerBodyContainer>
                <ProductionKPIContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ProductionKPI
