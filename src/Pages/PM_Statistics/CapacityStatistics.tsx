import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import PMCapacityStaticsContiner from "../../Containers/Statistics/PMCapacityStaticsContiner";

const CapacityStatistics = () => {
    return (
        <DashboardWrapContainer index={'analysis'}>

            <InnerBodyContainer>
                <PMCapacityStaticsContiner />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CapacityStatistics
