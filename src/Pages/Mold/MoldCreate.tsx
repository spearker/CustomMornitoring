import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldCreateContainer from "../../Containers/Mold/MoldCreate";

const MoldCreate = () => {
    return (
        <DashboardWrapContainer index={'mold'}>
            <InnerBodyContainer>
                <MoldCreateContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldCreate
