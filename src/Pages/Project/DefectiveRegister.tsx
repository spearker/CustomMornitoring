import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import DefectiveRegisterContainer from "../../Containers/Project/DefectiveRegister";

interface Props {
    match: any;
    chilren: string;
}

const DefectiveRegister = ({match}: Props) => {
    return (
        <DashboardWrapContainer index={'project'}>

            <InnerBodyContainer>
                <DefectiveRegisterContainer match={match} />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default DefectiveRegister
