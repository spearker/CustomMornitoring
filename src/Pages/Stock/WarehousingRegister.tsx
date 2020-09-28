import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import WarehousingRegisteContainer from "../../Containers/Stock/WarehousingRegister";
import Container from "../../Containers/Project/Worker";

interface Props {
    match: any;
    chilren: string;
}

const WarehousingRegister= ({match}: Props) => {
    return (
        <DashboardWrapContainer index={'stock'}>
            <InnerBodyContainer>
                <WarehousingRegisteContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default WarehousingRegister
