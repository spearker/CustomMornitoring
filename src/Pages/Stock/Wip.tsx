import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import WipContainer from "../../Containers/Stock/Wip";

const StockWip = () => {
    return (
        <DashboardWrapContainer index={'stock'}>
            <SubNavigation list={MES_MENU_LIST.stock}/>
            <InnerBodyContainer>
                <WipContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default StockWip
