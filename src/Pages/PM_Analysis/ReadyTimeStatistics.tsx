import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST, PM_MENU_LIST } from '../../Common/routerset';
import PMReadyTimeContainer from "../../Containers/Statistics/PMReadytimeContiner";


const ReadyTimeStatistics = () => {

  useEffect(()=>{

  },[])

  return (
    <DashboardWrapContainer index={'analysis'}>
        <SubNavigation list={PM_MENU_LIST.analysis}/>
        <InnerBodyContainer>
         <PMReadyTimeContainer />
        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default ReadyTimeStatistics;
