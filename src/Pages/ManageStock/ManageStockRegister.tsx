import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ManageStockRegisterContainer from "../../Containers/ManageStock/ManageStockRegisterContainer";

const ManageStockRegister = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>
            <SubNavigation list={PM_MENU_LIST.statistics}/>
            <InnerBodyContainer>
                <ManageStockRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ManageStockRegister