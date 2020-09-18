import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import Container from '../../Containers/ListKeyin/tab';


const ListKeyinTab = () => {

  useEffect(()=>{

  },[])

  return (
    <DashboardWrapContainer index={12}>
        <SubNavigation list={ROUTER_MENU_LIST[12]}/>
        <InnerBodyContainer>
        <Container />



        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}



export default ListKeyinTab;
