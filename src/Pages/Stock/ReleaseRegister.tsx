import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ReleaseRegisterContainer from "../../Containers/Stock/ReleaseRegister";

const ReleaseRegister = () => {
    return (
        <DashboardWrapContainer index={'stock'}>
            <InnerBodyContainer>
                <ReleaseRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ReleaseRegister
