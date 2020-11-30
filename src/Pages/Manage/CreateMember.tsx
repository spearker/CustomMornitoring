import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import CreateMemberContainer from "../../Containers/Manage/CreateMember";

const CreateMember = () => {
    return (
        <DashboardWrapContainer index={'manage'}>
            <InnerBodyContainer>
                <CreateMemberContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CreateMember
