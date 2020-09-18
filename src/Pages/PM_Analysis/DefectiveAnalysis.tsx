import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/PM_Analysis/Defective';


const DefectiveAnalysis= ({match}:any) => {

    const { id } = match.params;

    return (
        <DashboardWrapContainer index={'analysis'}>

            <InnerBodyContainer>
                <Container/>



            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}



export default DefectiveAnalysis;
