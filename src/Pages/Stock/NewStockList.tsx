import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import NewStockListContainer from "../../Containers/Stock/NewStockListContainer";

const NewStockList: React.FunctionComponent = () => {

    return (
        <DashboardWrapContainer index={'stock'}>
            <InnerBodyContainer>
                <NewStockListContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default NewStockList
