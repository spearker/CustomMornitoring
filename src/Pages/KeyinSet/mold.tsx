import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import SetKeyinMoldContainer from '../../Containers/SetKeyin/mold';


const SetKeyinMold = () => {

  useEffect(()=>{

  },[])

  return (
    <DashboardWrapContainer index={11}>
        <SubNavigation list={ROUTER_MENU_LIST[11]}/>
        <InnerBodyContainer>
        <SetKeyinMoldContainer />



        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default SetKeyinMold;
