import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import PMReadyTimeContainer from "../../Containers/Statistics/PMReadytimeContiner";

const ReadyTimeStatics = () => {
    return (
        <DashboardWrapContainer index={'monitoring'}>
            <SubNavigation list={PM_MENU_LIST.statistics}/>
            <InnerBodyContainer>
                <PMReadyTimeContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ReadyTimeStatics
