import React from "react";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import SegmentListContainer from "../../Containers/Process/SegmentList";

const SegmentList = () => {
    return (
        <DashboardWrapContainer index={'process'}>

            <InnerBodyContainer>
                <SegmentListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default SegmentList
