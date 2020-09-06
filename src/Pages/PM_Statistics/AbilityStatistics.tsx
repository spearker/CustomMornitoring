import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import AbilityContainer from "../../Containers/PM_Statistics/Ability";

const AbilityStatistics = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <AbilityContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default AbilityStatistics
