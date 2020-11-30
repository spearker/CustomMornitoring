import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldCreateCompleteListContainer from "../../Containers/Mold/MoldCreateCompleteList";

const MoldRepairCompleteList = () => {
    return (
        <DashboardWrapContainer index={'mold'}>
            <InnerBodyContainer>
                <MoldCreateCompleteListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldRepairCompleteList
