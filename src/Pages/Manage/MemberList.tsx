import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import MoldCurrentContainer from "../../Containers/Mold/Current";
import MemberListContainer from "../../Containers/Manage/MemberList";

const MemberList = () => {
    return (
        <DashboardWrapContainer index={'manage'}>
            <InnerBodyContainer>
                <MemberListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MemberList
