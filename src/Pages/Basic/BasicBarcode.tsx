import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BasicBarcodeContainer from "../../Containers/Basic/BasicBarcodeContainer";

const BasicBarcode = () => {
    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <BasicBarcodeContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BasicBarcode
