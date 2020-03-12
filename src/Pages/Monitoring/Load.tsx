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
import { ROUTER_MONITORING } from '../../Common/routerset';
import MonitoringTable from '../../Components/Table/MonitoringTable';

// 로드톤 모니터링
const LoadMonitoring = () => {

  const [list, setList] = useState<[]>([]);
  
  const index = {
    status:'장비상태',
    group:'라인',
    name:'장비명',
    value:'로드모니터 측정값',
    max_value:'로드모니터 최고측정값',
    average_value:'로드모니터 평균측정값',
  }

  useEffect(()=>{

  
  },[])

  return (
      <DashboardWrapContainer>
        <SubNavigation list={ROUTER_MONITORING}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'로드톤 모니터링'}/>
          </div>
          <MonitoringTable indexList={index} keyName={'pk'} contents={dataSet.loadMonitoring}/>
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}

export default LoadMonitoring;