import React from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import QualityTestRequestContainer from "../../Containers/Qaulity/QualityTestRequest";

interface Props {
  match: any;
  chilren: string;
}

const QualityTestRequest = ({match}: Props) => {
    return(
        <DashboardWrapContainer index={'quality'}>
            <InnerBodyContainer>
                <QualityTestRequestContainer match={match}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default QualityTestRequest
