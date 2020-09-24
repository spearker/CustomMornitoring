import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import WarehousingRegisteContainer from "../../Containers/Stock/WarehousingRegister";

const WarehousingRegister= () => {
    return (
        <DashboardWrapContainer index={'stock'}>
            <InnerBodyContainer>
                <WarehousingRegisteContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default WarehousingRegister
