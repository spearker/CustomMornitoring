import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import NewBarcodeListContainer from "../../Containers/Barcode/NewBarcode";

const NewBarCodeList = () => {
    return (
        <DashboardWrapContainer index={'barcode'}>

            <InnerBodyContainer>
                <NewBarcodeListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewBarCodeList

