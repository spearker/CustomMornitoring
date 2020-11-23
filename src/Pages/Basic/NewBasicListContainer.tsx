import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import NewBasicListContainer from '../../Containers/Basic/NewBasicListContainer';

// 리스트 페이지
const NewBasicList = ({match}: any) => {

    const {id} = match.params;


    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <NewBasicListContainer type={id}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>

    );
}


export default NewBasicList;

