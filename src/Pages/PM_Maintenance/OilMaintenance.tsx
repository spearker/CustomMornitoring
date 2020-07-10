import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST, PM_MENU_LIST } from '../../Common/routerset';
import Container from '../../Containers/PM_Maintenance/OilContainer';


const OilMaintenance = () => {

  useEffect(()=>{
   
  },[])

  return (
    <DashboardWrapContainer index={'maintenance'}>
        <SubNavigation list={PM_MENU_LIST.maintenance}/>
        <InnerBodyContainer>
        <Container />
         
         
        
        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default OilMaintenance;