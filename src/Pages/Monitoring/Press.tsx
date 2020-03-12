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

// 프래스 모니터링
const PressMonitoring = () => {

  const [list, setList] = useState<[]>([]);

  const index = {
    status:'장비상태',
    group:'라인',
    name:'장비명',
    spm:'spm',
    angle:'앵글',
    current:'메인전류',
    loadtone:'로드톤',
    temperature:'온도',
    keycam_status:'키캠상태',
    motor_status:'모터상태',
    error:'에러', 
    live_time:'가동시간',
    rest_time:'비가동시간'

  }

  useEffect(()=>{

  
  },[])

  return (
      <DashboardWrapContainer>
        <SubNavigation list={ROUTER_MONITORING}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'프레스 모니터링'}/>
            
          </div>
          <MonitoringTable indexList={index} keyName={'pk'} contents={dataSet.pressMonitoring}/>
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}

export default PressMonitoring;