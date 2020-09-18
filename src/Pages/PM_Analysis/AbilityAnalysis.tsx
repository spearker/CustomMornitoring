import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import AbilityContainer from "../../Containers/PM_Analysis/Ability";

const AbilityAnalysis = () => {
    return (
        <DashboardWrapContainer index={'analysis'}>

            <InnerBodyContainer>
                <AbilityContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default AbilityAnalysis
