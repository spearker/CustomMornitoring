import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import RawMaterialContainer from "../../Containers/Stock/RawMaterial";

const StockRawMaterial = () => {
    return (
        <DashboardWrapContainer index={'stock'}>

            <InnerBodyContainer>
                <RawMaterialContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default StockRawMaterial
