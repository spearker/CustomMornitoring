import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST, PM_MENU_LIST } from '../../Common/routerset';
import ListKeyinMillingContainer from '../../Containers/ListKeyin/milling';
import ListKeyinMaterialContainer from '../../Containers/ListKeyin/material';
import ReadyTimeContainer from '../../Containers/Statistics/ReadyTimeContainer';


const ReadyTimeStatistics = () => {

  useEffect(()=>{
   
  },[])

  return (
    <DashboardWrapContainer index={'analysis'}>
        <SubNavigation list={PM_MENU_LIST.analysis}/>
        <InnerBodyContainer>
          
         <ReadyTimeContainer />
         
         
        
        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default ReadyTimeStatistics;