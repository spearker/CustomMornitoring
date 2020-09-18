import React from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import BasicListContainer from '../../Containers/Basic/BasicListContainer';

// 리스트 페이지
const BasicMachineList = ({match}: any) => {

  const { id } = match.params;


  return (
      <DashboardWrapContainer index={'basic'}>

        <InnerBodyContainer>
          <BasicListContainer type={id}/>
        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}



export default BasicMachineList;

