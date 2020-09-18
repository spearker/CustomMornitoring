import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import StockListContainer from "../../Containers/Stock/StockListContainer";

const StockList = () => {
    return (
        <DashboardWrapContainer index={'stock'}>

            <InnerBodyContainer>
                <StockListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default StockList
