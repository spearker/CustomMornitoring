import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import QualityTestCompleteWorkerContainer from "../../Containers/Qaulity/QualityTestCompleteWorker";

const QualityTestCompleteWorker = () => {
    return(
        <DashboardWrapContainer index={'quality'}>
            <InnerBodyContainer>
                <QualityTestCompleteWorkerContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default QualityTestCompleteWorker
