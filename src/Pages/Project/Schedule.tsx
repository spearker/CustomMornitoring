import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/Project/Schedule';


const ScheduleProduction = () => {

    return (
        <DashboardWrapContainer index={'project'}>

            <InnerBodyContainer>
                <Container/>

            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}


export default ScheduleProduction;
