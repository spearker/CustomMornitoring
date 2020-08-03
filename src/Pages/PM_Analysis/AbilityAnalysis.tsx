import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import AbilityContainer from "../../Containers/PM_Analysis/Ability";

const AbilityAnalysis = () => {
    return (
        <DashboardWrapContainer index={'analysis'}>
            <SubNavigation list={PM_MENU_LIST.analysis}/>
            <InnerBodyContainer>
                <AbilityContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default AbilityAnalysis
