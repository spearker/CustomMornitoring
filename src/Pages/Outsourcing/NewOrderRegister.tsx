import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import NewOrderRegisterContainer from "../../Containers/Outsourcing/NewOrderRegister";

const NewOrderRegister = ({match}:any) => {


    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <InnerBodyContainer>
                <NewOrderRegisterContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewOrderRegister

