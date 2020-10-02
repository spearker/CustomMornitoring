import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import OrderModifyContainer from "../../Containers/Marketing/OrderModify";

const OrderModify = ({match}:any) => {

    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <OrderModifyContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default OrderModify
