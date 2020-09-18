import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BarcodeModifyContainer from "../../Containers/Barcode/BarcodeModifyContainer";

const BarcodeModify = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <BarcodeModifyContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BarcodeModify
