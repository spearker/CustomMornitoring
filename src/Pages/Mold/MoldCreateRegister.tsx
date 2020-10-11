import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldCreateRegisterContainer from "../../Containers/Mold/MoldCreateRegister";

const MoldCreateRegister = ({match}:any) => {
    return (
        <DashboardWrapContainer index={'mold'}>
            <InnerBodyContainer>
                <MoldCreateRegisterContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldCreateRegister

