import React from 'react'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
// import CreateMemberContainer from '../../Pages/Old_Manage/CreatMember'
import CreateMemberContainer from "../../Containers/Manage/CreateMember";

const CreateMember = (match) => {
    return (
        <DashboardWrapContainer index={'manage'}>
            <InnerBodyContainer>
                <CreateMemberContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CreateMember
