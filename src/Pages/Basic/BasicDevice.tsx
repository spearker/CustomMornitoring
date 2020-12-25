import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BasicDeviceContainer from "../../Containers/Basic/BasicDeviceContainer";

const BasicDevice = () => {
    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <BasicDeviceContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BasicDevice
