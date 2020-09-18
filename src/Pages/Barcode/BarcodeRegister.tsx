import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BarcodeRegisterContainer from "../../Containers/Barcode/BarcodeRegisterContainter";

const BarcodeRegister = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <BarcodeRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BarcodeRegister
