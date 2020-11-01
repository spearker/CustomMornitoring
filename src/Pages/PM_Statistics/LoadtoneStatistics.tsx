import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/PM_Statistics/Loadtone';


const ErrorStatistics = ({match}: any) => {

    const {id} = match.params;

    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <Container/>


            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}


export default ErrorStatistics;
