import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import BarcodeListContainer from "../../Containers/Barcode/Barcode";

const BarcodeList = () => {
    return (
        <DashboardWrapContainer index={'barcode'}>

            <InnerBodyContainer>
                <BarcodeListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BarcodeList

