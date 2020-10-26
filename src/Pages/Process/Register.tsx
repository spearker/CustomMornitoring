import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ProcessRegisterContainer from "../../Containers/Process/Register";

const ProcessRegister = () => {
    return (
        <DashboardWrapContainer index={'process'}>

            <InnerBodyContainer>
                <ProcessRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ProcessRegister
