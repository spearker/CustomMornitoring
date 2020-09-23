import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldCreateRegisterContainer from "../../Containers/Mold/MoldCreateRegister";

const MoldCreateRegister = () => {
    return (
        <DashboardWrapContainer index={'mold'}>

            <InnerBodyContainer>
                <MoldCreateRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldCreateRegister

