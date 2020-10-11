import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldListContainer from "../../Containers/Mold/MoldManageList";

const MoldManageList = () => {
    return (
        <DashboardWrapContainer index={'mold'}>
            <InnerBodyContainer>
                <MoldListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldManageList
