import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ChitRegisterContainer from "../../Containers/Project/ChitRegister";

const ChitRegister = () => {
    return (
        <DashboardWrapContainer index={'project'}>

            <InnerBodyContainer>
                <ChitRegisterContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ChitRegister
