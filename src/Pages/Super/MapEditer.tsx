import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import MapEditorContiner from "../map/MapEditor";

interface Props {
    match: any;
    chilren: string;
}

const MapEditer = ({match}: Props) => {
    return (
        <DashboardWrapContainer>

            <InnerBodyContainer>
                <MapEditorContiner match={match} />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default MapEditer
