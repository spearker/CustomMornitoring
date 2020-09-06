import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ProcessListContainer from "../../Containers/Process/ProcessList";

const ProcessList = () => {
    return (
        <DashboardWrapContainer index={'process'}>
            <InnerBodyContainer>
                <ProcessListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ProcessList
