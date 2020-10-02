import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import ContractRegisterContainer from "../../Containers/Outsourcing/ContractRegister";

const ContractRegister = ({match}:any) => {

    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <InnerBodyContainer>
                <ContractRegisterContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ContractRegister

