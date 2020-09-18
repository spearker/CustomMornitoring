import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import InputKeyinPressContainer from '../../Containers/InputKeyin/press';


const InputKeyinPress = () => {

  useEffect(()=>{

  },[])

  return (
    <DashboardWrapContainer index={10}>
        <SubNavigation list={ROUTER_MENU_LIST[10]}/>
        <InnerBodyContainer>
        <InputKeyinPressContainer />



        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default InputKeyinPress;
