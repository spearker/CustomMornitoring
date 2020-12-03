import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldRepairCompleteListContainer from "../../Containers/Mold/MoldRepairCompleteList";

const MoldRepairCompleteList = () => {
    return (
        <DashboardWrapContainer index={'mold'}>
            <InnerBodyContainer>
                <MoldRepairCompleteListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldRepairCompleteList
