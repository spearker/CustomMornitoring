import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/Project/Worker';

interface Props {
    match: any;
    chilren: string;
}

const WorkProduction = ({match}: Props) => {


    return (
        <DashboardWrapContainer index={'project'}>
            <InnerBodyContainer>
                <Container  match={match} />



            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}



export default WorkProduction;
