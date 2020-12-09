import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import BasicDocumentLogContainer from "../../Containers/Basic/BasicDocumentLogContainer";

const BasicDocumentLog: React.FunctionComponent = () => {

    return (
        <DashboardWrapContainer index={'Basic'}>
            <InnerBodyContainer>
                <BasicDocumentLogContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BasicDocumentLog
