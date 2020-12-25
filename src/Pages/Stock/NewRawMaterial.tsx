import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import NewRawMaterialContainer from "../../Containers/Stock/NewRawMaterialContainer";

const NewRawMaterial: React.FunctionComponent = () => {

    return (
        <DashboardWrapContainer index={'stock'}>
            <InnerBodyContainer>
                <NewRawMaterialContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewRawMaterial
