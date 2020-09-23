import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import OrderRegisterContainer from "../../Containers/Outsourcing/OrderRegister";

const OrderRegister = () => {
    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <InnerBodyContainer>
                <OrderRegisterContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default OrderRegister

