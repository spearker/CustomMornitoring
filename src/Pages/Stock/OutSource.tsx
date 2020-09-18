import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import OutSourceContainer from "../../Containers/Stock/OutSource";

const StockOutSource = () => {
    return (
        <DashboardWrapContainer index={'stock'}>

            <InnerBodyContainer>
                <OutSourceContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default StockOutSource
