import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import PMCapacityStaticsContainer from "../../Containers/Statistics/PMCapacityStaticsContainer";

const CapacityStatistics = () => {
    return (
        <DashboardWrapContainer index={'analysis'}>

            <InnerBodyContainer>
                <PMCapacityStaticsContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CapacityStatistics
