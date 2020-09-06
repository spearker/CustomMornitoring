import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST, PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ProcessDetailRegisterContainer from "../../Containers/Process/DetailRegister";

const ProcessDetailRegister = () => {
    return (
        <DashboardWrapContainer index={'project'}>

            <InnerBodyContainer>
                <ProcessDetailRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ProcessDetailRegister
