import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import QualityKPI from "../../Containers/NewKPI/QualityKPI";

const NewQualityKPI = () => {
    return (
        <DashboardWrapContainer index={'kpi'}>
            <InnerBodyContainer>
                <QualityKPI />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewQualityKPI
