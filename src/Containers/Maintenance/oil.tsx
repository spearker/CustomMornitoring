import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from "../DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {ROUTER_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";

//오일 펌프 보전관리

//캘린더 api 는 react-calendar
//사용법 : https://www.npmjs.com/package/react-calendar
const OilMaintenanceContainer = () => {

  useEffect(()=>{

  },[])

  return (
<<<<<<< Updated upstream
    <div>
      <DashboardWrapContainer index={7}>
        <SubNavigation list={ROUTER_MENU_LIST[7]}/>
        <InnerBodyContainer>
=======

>>>>>>> Stashed changes
          <div style={{position:'relative'}}>

            <Header title={'오일 펌프 보전관리'} />

          </div>
<<<<<<< Updated upstream

        </InnerBodyContainer>
      </DashboardWrapContainer>
    </div>
=======
>>>>>>> Stashed changes
  );
}



export default OilMaintenanceContainer;
