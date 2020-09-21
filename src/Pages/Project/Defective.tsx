import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/Project/Defective';


const DefectiveProject = () => {

    return (
        <DashboardWrapContainer index={'project'}>
            <InnerBodyContainer>
                <Container/>

            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}



export default DefectiveProject;
