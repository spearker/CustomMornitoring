import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/Project/Voucher';

interface Props {
    match: any;
    chilren: string;
}

const VoucherProduction = ({match}: Props) => {


    return (
        <DashboardWrapContainer index={'project'}>
            <InnerBodyContainer>
                <Container  match={match} />



            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}



export default VoucherProduction;
