import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/Project/TodayVoucher';

interface Props {
    match: any;
    chilren: string;
}

const TodayVoucherProduction = () => {


    return (
        <DashboardWrapContainer index={'project'}>
            <InnerBodyContainer>
                <Container/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}


export default TodayVoucherProduction;
