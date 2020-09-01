import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import FinishMaterialContainer from "../../Containers/Stock/FinishMaterial";

const StockFinishMaterial = () => {
    return (
        <DashboardWrapContainer index={'stock'}>
            <SubNavigation list={MES_MENU_LIST.stock}/>
            <InnerBodyContainer>
                <FinishMaterialContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default StockFinishMaterial
