import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import NewBarcodeRegisterContainer from "../../Containers/Barcode/NewBarcodeRegisterContainter";

const NewBarcodeRegister = ({match}: any) => {
    return (
        <DashboardWrapContainer index={'barcode'}>
            <InnerBodyContainer>
                <NewBarcodeRegisterContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewBarcodeRegister
