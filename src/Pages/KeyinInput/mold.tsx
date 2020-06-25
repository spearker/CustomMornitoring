import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST } from '../../Common/routerset';
import InputKeyinMaterialContainer from '../../Containers/InputKeyin/material';
import InputKeyinMillingContainer from '../../Containers/InputKeyin/milling';
import InputKeyinMoldContainer from '../../Containers/InputKeyin/mold';

const InputKeyinMold = () => {

  useEffect(()=>{
   
  },[])

  return (
    <DashboardWrapContainer index={10}>
        <SubNavigation list={ROUTER_MENU_LIST[10]}/>
        <InnerBodyContainer>
        <InputKeyinMoldContainer />
         
         
        
        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default InputKeyinMold;