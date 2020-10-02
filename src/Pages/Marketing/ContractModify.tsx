import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ContractModifyContainer from "../../Containers/Marketing/ContractModify";

const ContractModify = ({match}:any) => {

    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <ContractModifyContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ContractModify
