import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST } from '../../Common/routerset';
import SetKeyinMaterialContainer from '../../Containers/SetKeyin/material';
import SetKeyinMillingContainer from '../../Containers/SetKeyin/milling';
import SetKeyinMoldContainer from '../../Containers/SetKeyin/mold';
import SetKeyinSunbanContainer from '../../Containers/SetKeyin/sunban';
import SetKeyinTabContainer from '../../Containers/SetKeyin/tab';


const SetKeyinTab = () => {

  useEffect(()=>{
   
  },[])

  return (
    <DashboardWrapContainer index={11}>
        <SubNavigation list={ROUTER_MENU_LIST[11]}/>
        <InnerBodyContainer>
        <SetKeyinTabContainer />
         
         
        
        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}


export default SetKeyinTab;