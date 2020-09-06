import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import OrderModifyContainer from "../../Containers/Marketing/OrderModify";

const OrderModify = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <OrderModifyContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default OrderModify
