import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import PartsContainer from "../../Containers/Stock/Parts";

const StockParts = () => {
    return (
        <DashboardWrapContainer index={'stock'}>
            <InnerBodyContainer>
                <PartsContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default StockParts
