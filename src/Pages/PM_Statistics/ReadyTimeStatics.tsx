import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ReadyTimeStatisticsContainer from "../../Containers/PM_Statistics/ReadyTimeStatisticsContiner";

const ReadyTimeStatics = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>
            <InnerBodyContainer>
                <ReadyTimeStatisticsContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ReadyTimeStatics
