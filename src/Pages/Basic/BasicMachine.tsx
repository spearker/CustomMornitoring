import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BasicMachineContainer from "../../Containers/Basic/BasicMachineContainer";

const BasicMachine = () => {
    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <BasicMachineContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BasicMachine
