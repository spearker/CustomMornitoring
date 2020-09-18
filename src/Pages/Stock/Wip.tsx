import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import WipContainer from "../../Containers/Stock/Wip";

const StockWip = () => {
    return (
        <DashboardWrapContainer index={'stock'}>

            <InnerBodyContainer>
                <WipContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default StockWip
