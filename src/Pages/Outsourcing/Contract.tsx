import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import { MES_MENU_LIST } from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import ContracttListContainer from "../../Containers/Outsourcing/Contract";

const ContracttList = () => {
    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <SubNavigation list={MES_MENU_LIST.outsourcing} />
            <InnerBodyContainer>
                <ContracttListContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ContracttList
