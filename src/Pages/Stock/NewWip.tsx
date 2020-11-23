import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import NewWipContainer from "../../Containers/Stock/NewWipContainer";

const NewWip: React.FunctionComponent = () => {

    return (
        <DashboardWrapContainer index={'stock'}>
            <InnerBodyContainer>
                <NewWipContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewWip
