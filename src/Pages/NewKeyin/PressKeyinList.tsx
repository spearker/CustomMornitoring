import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import PressKeyinListContainer from '../../Containers/NewKeyin/PressKeyinListContainer';

const PressKeyinList = () => {

    return (
        <DashboardWrapContainer index={'keyin'}>
            <InnerBodyContainer>

                <PressKeyinListContainer />
                
            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}


export default PressKeyinList;
