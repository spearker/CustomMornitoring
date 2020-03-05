import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import { getRequest } from '../../Common/requestFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MANAGE, ROUTER_REGISTER } from '../../Common/routerset';

// 통계
const Charts = () => {


  useEffect(()=>{

  
  },[])

  return (
      <DashboardWrapContainer>
      
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'통계'}/>
          </div>
        
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}

export default Charts;