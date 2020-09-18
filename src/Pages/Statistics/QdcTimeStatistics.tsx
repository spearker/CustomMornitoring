import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import QdcTimeContainer from '../../Containers/Statistics/QdcTimeContainer';


const QdcTimeStatistics = () => {

  useEffect(()=>{

  },[])

  return (
    <DashboardWrapContainer index={15}>
        <SubNavigation list={ROUTER_MENU_LIST[15]}/>
        <InnerBodyContainer>

         <QdcTimeContainer />



        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default QdcTimeStatistics;
