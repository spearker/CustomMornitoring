import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ContractRegisterContainer from "../../Containers/Marketing/ContractRegister";

const ContractRegister = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <ContractRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ContractRegister

