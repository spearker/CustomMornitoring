import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import QualityTestRequestInspectorContainer from "../../Containers/Qaulity/QualityTestRequestInspector";

interface Props {
    match: any;
}

const QualityTestRequestInspector = ({match}: Props) => {
    return (
        <DashboardWrapContainer index={'quality'}>
            <InnerBodyContainer>
                <QualityTestRequestInspectorContainer match={match} />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default QualityTestRequestInspector
