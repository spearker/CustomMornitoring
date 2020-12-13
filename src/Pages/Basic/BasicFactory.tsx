import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BasicFactoryContainer from "../../Containers/Basic/BasicFactoryContainer";

const BasicFactory = () => {
    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <BasicFactoryContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BasicFactory
