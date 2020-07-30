import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST, PM_MENU_LIST } from '../../Common/routerset';
import ListKeyinMillingContainer from '../../Containers/ListKeyin/milling';
import ListKeyinMaterialContainer from '../../Containers/ListKeyin/material';
import ReadyTimeContainer from '../../Containers/Statistics/ReadyTimeContainer';
import ReadyTimeStatisticsContainer from "../../Containers/PM_Statistics/ReadyTimeStatisticsContiner";


const ReadyTimeStatistics = () => {

  useEffect(()=>{

  },[])

  return (
    <DashboardWrapContainer index={'statistics'}>
        <SubNavigation list={PM_MENU_LIST.statistics}/>
        <InnerBodyContainer>
         <ReadyTimeStatisticsContainer />
        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default ReadyTimeStatistics;
