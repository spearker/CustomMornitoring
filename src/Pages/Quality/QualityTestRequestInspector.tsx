import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import QualityTestRequestInspectorContainer from "../../Containers/Qaulity/QualityTestRequestInspector";

const QualityTestRequestInspector = () => {
    return (
        <DashboardWrapContainer index={'quality'}>
            <InnerBodyContainer>
                <QualityTestRequestInspectorContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default QualityTestRequestInspector
