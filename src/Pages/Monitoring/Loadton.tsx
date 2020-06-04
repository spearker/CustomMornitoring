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
import { ROUTER_MONITORING, ROUTER_MENU_LIST } from '../../Common/routerset';
import MonitoringTable from '../../Components/Table/MonitoringTable';
import icCircleRotate from '../../Assets/Images/ic_circle_rotate.png'
import HeaderLive from '../../Components/Text/HeaderLive';
import MonitoringTableCommon from '../../Components/Table/MonitoringTableCommon';
import MonitoringDropdown from '../../Components/Dropdown/MonitoringDropdown';
import MonitoringTableFilter from '../../Components/Table/MonitoringTableFilter';
import MonitoringToggle from '../../Components/Toggle/MonitoringToggle';
import MonitoringTabs from '../../Components/Tabs/MonitoringTabs';
import MonitoringOptionButton from '../../Components/Button/MonitoringOptionButton';
import MonitoringCard from '../../Components/Card/MonitoringCard';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchedList from '../../Components/List/SearchedList';
import { transferCodeToName } from '../../Common/codeTransferFunctions';
import { useHistory } from 'react-router-dom';
import MonitoringVerticalTable from '../../Components/Table/MonitoringVerticalTable';
import LoadTonCard from '../../Components/Card/LoadTonCard';
import CMSMonitoringTabs from '../../Components/Tabs/CMSMonitoringTabs';
import TEMP_IMG_1 from '../../Assets/Dummy/monitoring_loadton.png'
// 로드톤 모니터링
const LoadtonMonitoring = () => {

    const [statusFilter,setStatusFilter ]  = useState<string>('')
    const [arrayType, setArrayType] = useState<number>(0); //['공장 모니터링' , '기계별 모니터링']

  return (
      <DashboardWrapContainer index={11}>
        <SubNavigation list={ROUTER_MENU_LIST[11]}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
              <HeaderLive title={ ' 로드톤 모니터링'} isTurn={true}/>        
              
          </div>
          <div style={{textAlign:'left', marginBottom: 20}}>
          <MonitoringToggle contents={['공장 로드모니터 현황', '장비별 로드모니터 현황']} select={arrayType} onClickEvent={setArrayType}/>
          </div>
       
       {
           arrayType === 0 ?
           <img src={TEMP_IMG_1} style={{width: '100%'}}/>
           :
      
                <div style={{
                    position: 'relative',
                    marginTop: 13,
                    width: 'calc(100% - 20px)',
                    height: 750,
                    backgroundColor: '#242933',
                    borderRadius: 8,
        
                    padding:10,
               
                }}>
                    <div style={{margin: 10}}>
                        <p style={{textAlign: "left", marginTop:10, fontSize: 20}}>1공장</p>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}>
                    {
                        dataSet.LoadTonData &&
                            dataSet.LoadTonData.map((item, index) => {
                                return(<LoadTonCard title={item.title} color={index} propData={{today: item.today, yesterday: item.yesterday}} limit={item.limit}/>)
                            })
                    }
                    </div>
                </div>
}
            </InnerBodyContainer>
        
      </DashboardWrapContainer>
      
  );
}

const WrapBox = Styled.div`
    text-align: left;
    margin-top: 24px;
    position: relative;
    display: block;
    margin-bottom: 2px;
`

export default LoadtonMonitoring;
