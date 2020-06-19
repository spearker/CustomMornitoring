import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from "../DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {ROUTER_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";

//모터 역회전 상태 분석 (디자인 안나옴)

//캘린더 api 는 react-calendar
//사용법 : https://www.npmjs.com/package/react-calendar
const MotorRotationMaintenanceContainer = () => {

  useEffect(()=>{

  },[])

  return (
    <div>
      
    </div>
  );
}



export default MotorRotationMaintenanceContainer;
