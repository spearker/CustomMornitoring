import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/Project/ScheduleManage';


const ScheduleManageProduction = () => {

    return (
        <DashboardWrapContainer index={'project'}>

            <InnerBodyContainer>
                <Container/>

            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}


export default ScheduleManageProduction;
