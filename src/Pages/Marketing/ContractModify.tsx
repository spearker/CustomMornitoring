import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ContractModifyContainer from "../../Containers/Marketing/ContractModify";

const ContractModify = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <ContractModifyContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ContractModify
