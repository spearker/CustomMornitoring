import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import SetKeyinMillingContainer from '../../Containers/SetKeyin/milling';


const SetKeyinMilling = () => {

  useEffect(()=>{

  },[])

  return (
    <DashboardWrapContainer index={11}>
        <SubNavigation list={ROUTER_MENU_LIST[11]}/>
        <InnerBodyContainer>
        <SetKeyinMillingContainer />



        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default SetKeyinMilling;
