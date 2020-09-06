import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import QualityListContainer from "../../Containers/Qaulity/QualityList";

const QualityList = () => {
    return (
        <DashboardWrapContainer index={'quality'}>

            <InnerBodyContainer>
                <QualityListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default QualityList
