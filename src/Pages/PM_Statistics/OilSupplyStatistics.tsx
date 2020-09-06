import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import OilSupplyContainer from "../../Containers/PM_Statistics/OilSupply";

const OilSupplyStatistics = () => {
    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <OilSupplyContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default OilSupplyStatistics
