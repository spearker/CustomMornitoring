import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import NewBasicBarcodeContainer from "../../Containers/Basic/NewBasicBarcodeContainer";

const NewBasicBarcode = () => {
    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <NewBasicBarcodeContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewBasicBarcode
