import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import DuedateKPI from "../../Containers/NewKPI/DuedateKPI";

const NewDuedateKPI = () => {
    return (
        <DashboardWrapContainer index={'kpi'}>
            <InnerBodyContainer>
                <DuedateKPI />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewDuedateKPI
