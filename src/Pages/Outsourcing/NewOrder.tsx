import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import NewOrdertListContainer from "../../Containers/Outsourcing/NewOrder";

const NewOrdertList = () => {
    return (
        <DashboardWrapContainer index={'outsourcing'}>
            <InnerBodyContainer>
                <NewOrdertListContainer />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewOrdertList
