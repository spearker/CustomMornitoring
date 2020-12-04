import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import EnergyKPI from "../../Containers/NewKPI/EnergyKPI";

const NewEnergyKPI = () => {
    return (
        <DashboardWrapContainer index={'kpi'}>
            <InnerBodyContainer>
                <EnergyKPI />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewEnergyKPI
