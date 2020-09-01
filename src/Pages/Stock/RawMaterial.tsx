
import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import RawMaterialContainer from "../../Containers/Stock/RawMaterial";

const StockRawMaterial = () => {
    return (
        <DashboardWrapContainer index={'stock'}>
            <SubNavigation list={MES_MENU_LIST.stock}/>
            <InnerBodyContainer>
                <RawMaterialContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default StockRawMaterial
