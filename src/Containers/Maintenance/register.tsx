import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from "../DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {ROUTER_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";

//보전 등록 (수민)

const MaintenanceRegisterContainer = () => {

  useEffect(()=>{

  },[])

  return (
    <div>
          <div style={{position:'relative'}}>

            <Header title={'보전 등록'} />

          </div>

    </div>
  );
}



export default MaintenanceRegisterContainer;
