import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import MapList from "./MapList";

const MapListPage = () => {
    return (
        <DashboardWrapContainer>

            <InnerBodyContainer>
                <MapList/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MapListPage
