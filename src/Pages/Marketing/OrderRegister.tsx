import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import OrderRegisterContainer from "../../Containers/Marketing/OrderRegister";

const OrderRegister = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <OrderRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default OrderRegister
