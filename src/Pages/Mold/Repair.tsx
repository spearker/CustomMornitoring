import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import RepairContainer from "../../Containers/Mold/Repair";

const MoldRepair = () => {
    return (
        <DashboardWrapContainer index={'mold'}>

            <InnerBodyContainer>
                <RepairContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MoldRepair
