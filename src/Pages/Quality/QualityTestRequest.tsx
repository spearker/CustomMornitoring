import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import QualityTestRequestContainer from "../../Containers/Qaulity/QualityTestRequest";

const QualityTestRequest = () => {
    return(
        <DashboardWrapContainer index={'quality'}>
            <InnerBodyContainer>
                <QualityTestRequestContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default QualityTestRequest
