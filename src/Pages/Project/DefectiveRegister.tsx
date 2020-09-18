import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import DefectiveRegisterContainer from "../../Containers/Project/DefectiveRegister";

const ChitRegister = () => {
    return (
        <DashboardWrapContainer index={'project'}>

            <InnerBodyContainer>
                <DefectiveRegisterContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ChitRegister
