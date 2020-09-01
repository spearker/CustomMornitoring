import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import StockListContainer from "../../Containers/InventoryManagement/StockListContainer";

const StockList = () => {
    return (
        <DashboardWrapContainer index={'stock'}>
            <SubNavigation list={MES_MENU_LIST.stock}/>
            <InnerBodyContainer>
                <StockListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default StockList