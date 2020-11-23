import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import NewFinishedContainer from "../../Containers/Stock/NewFinishedContainer";

const NewFinishedMaterial: React.FunctionComponent = () => {

    return (
        <DashboardWrapContainer index={'stock'}>
            <InnerBodyContainer>
                <NewFinishedContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewFinishedMaterial
