import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import QualityTestListWorkerContainer from "../../Containers/Qaulity/QualityTestListWorker";


const QualityTestListWorker = () => {
    return(
        <DashboardWrapContainer index={'quality'}>
            <InnerBodyContainer>
                <QualityTestListWorkerContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default QualityTestListWorker
