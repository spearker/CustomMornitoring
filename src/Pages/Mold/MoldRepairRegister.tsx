import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import MoldRepairRegisterContainer from "../../Containers/Mold/MoldRepairRegister";

const MoldRepairRegister = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>
            <SubNavigation list={PM_MENU_LIST.statistics}/>
            <InnerBodyContainer>
                <MoldRepairRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldRepairRegister
