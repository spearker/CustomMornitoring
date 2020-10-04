import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import QualityTestCompleteContainer from "../../Containers/Qaulity/QualityTestComplete";

const QualityTestComplete = () => {
    return(
        <DashboardWrapContainer index={'quality'}>
            <InnerBodyContainer>
                <QualityTestCompleteContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default QualityTestComplete
