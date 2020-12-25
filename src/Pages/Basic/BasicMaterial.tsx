import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BasicMaterialContainer from "../../Containers/Basic/BasicMaterialContainer";

const BasicMaterial = () => {
    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <BasicMaterialContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BasicMaterial
