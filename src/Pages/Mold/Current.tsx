import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldRegisterContainer from "../../Containers/Mold/MoldRegister";

const MoldRegister = () => {
    return (
        <DashboardWrapContainer index={'mold'}>
            <SubNavigation list={MES_MENU_LIST.mold}/>
            <InnerBodyContainer>
                <MoldRegisterContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldRegister
