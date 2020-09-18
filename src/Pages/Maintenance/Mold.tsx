import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/Maintenance/Mold';


const MoldMaintenance = ({match}:any) => {

    const { id } = match.params;

    return (
        <DashboardWrapContainer index={'maintenance'}>

            <InnerBodyContainer>
                <Container />



            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}



export default MoldMaintenance;
