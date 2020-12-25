import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BasicMoldContainer from "../../Containers/Basic/BasicMoldContainer";

const BasicMold = () => {
    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <BasicMoldContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BasicMold
