import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import SetKeyinSunbanContainer from '../../Containers/SetKeyin/sunban';


const SetKeyinSunban = () => {

  useEffect(()=>{

  },[])

  return (
    <DashboardWrapContainer index={11}>
        <SubNavigation list={ROUTER_MENU_LIST[11]}/>
        <InnerBodyContainer>
        <SetKeyinSunbanContainer />



        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}


export default SetKeyinSunban;
