import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import { MES_MENU_LIST } from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import OrdertListContainer from "../../Containers/Outsourcing/Order";

const OrdertList = () => {
    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <SubNavigation list={MES_MENU_LIST.outsourcing} />
            <InnerBodyContainer>
                <OrdertListContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default OrdertList
