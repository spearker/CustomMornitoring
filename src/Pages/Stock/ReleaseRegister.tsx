import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import ReleaseRegisterContainer from "../../Containers/Stock/ReleaseRegister";


interface Props {
    match: any;
    chilren: string;
}

const ReleaseRegister = ({match}: Props) => {
    return (
        <DashboardWrapContainer index={'stock'}>
            <InnerBodyContainer>
                <ReleaseRegisterContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default ReleaseRegister
