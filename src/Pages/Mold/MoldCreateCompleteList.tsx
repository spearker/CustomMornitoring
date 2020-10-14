import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldCreateCompleteListContainer from "../../Containers/Mold/MoldCreateCompleteList";

const MoldCreateCompleteList = () => {
    return (
        <DashboardWrapContainer index={'mold'}>
            <InnerBodyContainer>
                <MoldCreateCompleteListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldCreateCompleteList
