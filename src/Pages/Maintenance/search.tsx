import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import Container from '../../Containers/Maintenance/search';


const SearchMaintenance = () => {

  useEffect(()=>{

  },[])

  return (
    <DashboardWrapContainer index={5}>
        <SubNavigation list={ROUTER_MENU_LIST[5]}/>
        <InnerBodyContainer>
        <Container />



        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}



export default SearchMaintenance;
