
import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldRepairRegisterContainer from "../../Containers/Mold/MoldRepairRegister";

const MoldRepairRegister = () => {
    return (
        <DashboardWrapContainer index={'mold'}>
            <SubNavigation list={MES_MENU_LIST.mold}/>
            <InnerBodyContainer>
                <MoldRepairRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}


export default MoldRepairRegister
