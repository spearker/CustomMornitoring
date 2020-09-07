import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import CustomerRegisterContainer from "../../Containers/Customer/CustomerRegister";

const CustomerRegister = () => {
    return (
        <DashboardWrapContainer index={'customer'}>
            <InnerBodyContainer>
                <CustomerRegisterContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CustomerRegister
