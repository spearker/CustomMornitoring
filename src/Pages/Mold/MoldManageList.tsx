import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldRegisterContainer from "../../Containers/Mold/MoldRegister";

const MoldRegister = () => {
    return (
        <DashboardWrapContainer index={'mold'}>
            <InnerBodyContainer>
                <MoldRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldRegister
