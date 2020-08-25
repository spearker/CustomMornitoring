import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BarcodeModifyContainer from "../../Containers/Barcode/BarcodeModifyContainer";

const BarcodeModify = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>
            <SubNavigation list={PM_MENU_LIST.statistics}/>
            <InnerBodyContainer>
                <BarcodeModifyContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BarcodeModify
