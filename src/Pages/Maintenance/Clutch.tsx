import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/PM_Maintenance/Clutch';


const ClutchMaintenance = () => {

    return (
        <DashboardWrapContainer index={'maintenance'}>

            <InnerBodyContainer>
                <Container />
            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}



export default ClutchMaintenance;
