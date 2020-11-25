import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import Container from "../../Containers/Basic/NewBasicItemListContainer";


const NewBasicItemList: React.FunctionComponent = () => {
    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <Container/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewBasicItemList
