import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import RepairContainer from "../../Containers/Mold/Repair";

const MoldRepair = () => {
    return (
        <DashboardWrapContainer index={'mold'}>

            <InnerBodyContainer>
                <RepairContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldRepair
