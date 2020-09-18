import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import ContracttListContainer from "../../Containers/Outsourcing/Contract";

const ContracttList = () => {
    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <InnerBodyContainer>
                <ContracttListContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ContracttList
