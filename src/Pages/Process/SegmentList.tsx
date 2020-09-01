import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import SegmentListContainer from "../../Containers/Process/SegmentList";

const SegmentList = () => {
    return (
        <DashboardWrapContainer index={'process'}>
            <SubNavigation list={MES_MENU_LIST.process}/>
            <InnerBodyContainer>
                <SegmentListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default SegmentList
