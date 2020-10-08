import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import QualityDetailListContainer from "../../Containers/Qaulity/QualityDetailList";

const QualityDetailList = ({match}) => {
    return (
        <DashboardWrapContainer index={'quality'}>
            <InnerBodyContainer>
                <QualityDetailListContainer match={match} />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default QualityDetailList
