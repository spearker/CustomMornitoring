import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import MoldManageCreateContainer from "../../Containers/Mold/MoldManageCreate";

const MoldMangeCreate = () => {
    return(
        <DashboardWrapContainer index={'mold'}>
            <InnerBodyContainer>
                <MoldManageCreateContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldMangeCreate
