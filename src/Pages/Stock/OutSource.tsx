import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import OutSourceContainer from "../../Containers/Stock/OutSource";

const StockOutSource = () => {
    return (
        <DashboardWrapContainer index={'stock'}>
            <SubNavigation list={MES_MENU_LIST.stock}/>
            <InnerBodyContainer>
                <OutSourceContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default StockOutSource
