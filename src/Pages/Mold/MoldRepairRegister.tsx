import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldRepairRegisterContainer from "../../Containers/Mold/MoldRepairRegister";

const MoldRepairRegister = () => {
    return (
        <DashboardWrapContainer index={'mold'}>

            <InnerBodyContainer>
                <MoldRepairRegisterContainer/>

            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldRepairRegister
