import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from "../DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {ROUTER_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";

//주변장치 보전 관리 (디자인 안나옴 / 보류 됬다고 함)

//캘린더 api 는 react-calendar
//사용법 : https://www.npmjs.com/package/react-calendar
const SubmachineMaintenanceContainer = () => {

  useEffect(()=>{

  },[])

  return (
    <div>
      <DashboardWrapContainer index={7}>
        <SubNavigation list={ROUTER_MENU_LIST[7]}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>

            <Header title={'주변장치 보전 관리'} />

          </div>

        </InnerBodyContainer>
      </DashboardWrapContainer>
    </div>
  );
}



export default SubmachineMaintenanceContainer;
