import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import OrdertListContainer from "../../Containers/Outsourcing/Order";

const OrdertList = () => {
    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <InnerBodyContainer>
                <OrdertListContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default OrdertList
