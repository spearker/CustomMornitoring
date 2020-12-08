import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import PMCapacityStaticsContainer from "../../Containers/Statistics/PMCapacityStaticsContainer";
import CustomCapacity from "../../Containers/Custom/pm_analysis/CustomCapacity";

const CapacityStatistics = () => {
    return (
        <DashboardWrapContainer index={'analysis'}>

            <InnerBodyContainer>
                <CustomCapacity/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CapacityStatistics
