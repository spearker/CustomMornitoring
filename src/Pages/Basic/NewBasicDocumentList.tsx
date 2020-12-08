import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import Container from "../../Containers/Basic/BasicDocumentListContainer";

const NewBasicDocumentList: React.FunctionComponent = () => {
    return (
        <div>
            <DashboardWrapContainer index={'basic'}>
                <InnerBodyContainer>
                    <Container/>
                </InnerBodyContainer>
            </DashboardWrapContainer>
        </div>
    )
}

export default NewBasicDocumentList
