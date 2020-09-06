import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ProcessRegisterContainer from "../../Containers/Process/Register";

const ProcessRegister = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <ProcessRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ProcessRegister
