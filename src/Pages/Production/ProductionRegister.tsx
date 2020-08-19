import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ProductionRegisterContainer from "../../Containers/Production/ProductionRegister";

const ProductionRegister = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>
            <SubNavigation list={PM_MENU_LIST.statistics}/>
            <InnerBodyContainer>
                <ProductionRegisterContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ProductionRegister
