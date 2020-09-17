import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import CustomerRegisterContainer from "../../Containers/Customer/CustomerRegister";
import MapEditorContiner from "../map/MapEditor";

interface Props {
    match: any;
    chilren: string;
}


const CustomerRegister = ({match}: Props) => {
    return (
        <DashboardWrapContainer index={'customer'}>
            <InnerBodyContainer>
                <CustomerRegisterContainer  match={match}  />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CustomerRegister
