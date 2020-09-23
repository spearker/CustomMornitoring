import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import ContractRegisterContainer from "../../Containers/Outsourcing/ContractRegister";

const ContractRegister = () => {
    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <InnerBodyContainer>
                <ContractRegisterContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ContractRegister

