import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import QualityTestListContainer from "../../Containers/Qaulity/QualityTestLIst";

const QualityTestList = () => {
    return(
        <DashboardWrapContainer index={'quality'}>
            <InnerBodyContainer>
                <QualityTestListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default QualityTestList
