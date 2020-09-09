import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import WorkHistoryRegisterContainer from "../../Containers/Project/WorkHistoryRegister";

const WorkHistoryRegister = () => {
    return (
        <DashboardWrapContainer index={'project'}>

            <InnerBodyContainer>
                <WorkHistoryRegisterContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default WorkHistoryRegister
