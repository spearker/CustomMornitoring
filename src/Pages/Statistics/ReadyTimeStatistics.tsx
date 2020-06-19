import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST } from '../../Common/routerset';
import ListKeyinMillingContainer from '../../Containers/ListKeyin/milling';
import ListKeyinMaterialContainer from '../../Containers/ListKeyin/material';
import ReadyTimeContainer from '../../Containers/Statistics/ReadyTimeContainer';


const ReadyTimeStatistics = () => {

  useEffect(()=>{
   
  },[])

  return (
    <DashboardWrapContainer index={15}>
        <SubNavigation list={ROUTER_MENU_LIST[15]}/>
        <InnerBodyContainer>
          
         <ReadyTimeContainer />
         
         
        
        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default ReadyTimeStatistics;