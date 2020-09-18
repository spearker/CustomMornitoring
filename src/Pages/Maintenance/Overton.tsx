import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/Maintenance/Overton';


const OvertonMaintenance = ({match}:any) => {

    return (
        <DashboardWrapContainer index={'maintenance'}>

            <InnerBodyContainer>
                <Container/>



            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}



export default OvertonMaintenance;
