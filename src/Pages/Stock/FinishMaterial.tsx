import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import FinishMaterialContainer from "../../Containers/Stock/FinishMaterial";

const StockFinishMaterial = () => {
    return (
        <DashboardWrapContainer index={'stock'}>

            <InnerBodyContainer>
                <FinishMaterialContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default StockFinishMaterial
