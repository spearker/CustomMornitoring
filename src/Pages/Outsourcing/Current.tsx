import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import { MES_MENU_LIST } from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import CurrentListContainer from "../../Containers/Outsourcing/Current";

const CurrentList = () => {
    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <InnerBodyContainer>
                <CurrentListContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CurrentList
