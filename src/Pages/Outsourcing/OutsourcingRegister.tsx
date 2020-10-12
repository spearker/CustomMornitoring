import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import OutsourcingRegisterContainer from "../../Containers/Outsourcing/OutsourcingRegister";

const OutsourcingRegister = ({match}:any) => {
    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <InnerBodyContainer>
                <OutsourcingRegisterContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default OutsourcingRegister

