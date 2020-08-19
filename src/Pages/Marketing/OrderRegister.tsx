import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import OrderRegisterContainer from "../../Containers/Marketing/OrderRegister";

const OrderRegister = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>
            <SubNavigation list={PM_MENU_LIST.statistics}/>
            <InnerBodyContainer>
                <OrderRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default OrderRegister
