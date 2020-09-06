import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ProductionRegisterContainer from "../../Containers/Project/ProductionRegister";

const ProductionRegister = () => {
    return (
        <DashboardWrapContainer index={'project'}>

            <InnerBodyContainer>
                <ProductionRegisterContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ProductionRegister
