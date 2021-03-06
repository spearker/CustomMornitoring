import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import ListKeyinMaterialContainer from '../../Containers/ListKeyin/material';


const ListKeyinMaterial = () => {

  useEffect(()=>{

  },[])

  return (
    <DashboardWrapContainer index={12}>
        <SubNavigation list={ROUTER_MENU_LIST[12]}/>
        <InnerBodyContainer>

          <ListKeyinMaterialContainer />



        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default ListKeyinMaterial;
