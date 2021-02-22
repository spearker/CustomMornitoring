import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import NewContractRegisterContainer from "../../Containers/Outsourcing/NewContractRegister";

const NewContractRegister = ({match}:any) => {

    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <InnerBodyContainer>
                <NewContractRegisterContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewContractRegister

