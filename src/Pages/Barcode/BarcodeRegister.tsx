import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ContractModifyContainer from "../../Containers/Marketing/ContractModify";
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
