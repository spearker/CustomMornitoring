import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BasicPartsContainer from "../../Containers/Basic/BasicPartsContainer";

const BasicParts = () => {
    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <BasicPartsContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BasicParts
