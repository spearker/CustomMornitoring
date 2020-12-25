import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BasicSubdividedContainer from "../../Containers/Basic/BasicSubdividedContainer";

const BasicSubdivided = () => {
    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <BasicSubdividedContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BasicSubdivided
