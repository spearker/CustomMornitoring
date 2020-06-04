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
import TEMP_IMG_1 from '../../Assets/Dummy/keyin_setting_1.svg'
import TEMP_IMG_2 from '../../Assets/Dummy/keyin_setting_2.svg'
import { useHistory } from 'react-router-dom';
import MonitoringVerticalTable from '../../Components/Table/MonitoringVerticalTable';
import { ROUTER_MENU_LIST } from '../../Common/routerset';
import SubNavigation2 from '../../Components/Navigation/SubNavigation2';
import MonitoringOptionButton from '../../Components/Button/MonitoringOptionButton';

// 키인 설정
const SettingKeyin = ({ match }) => {

  const [list, setList] = useState<IMonitoringList[]>([]);
  const history = useHistory();
  const { id } = match.params;

  return (
      <DashboardWrapContainer index={10}>
        <SubNavigation2 list={[ 
           { name : '프레스 Key-in', url : '/keyin/setting/프레스'},
        { name : '프레스 Key-in', url : '/keyin/setting/프레스'},
        { name : '금형 Key-in', url : '/keyin/setting/금형'},
        { name : '용접기 Key-in', url : '/keyin/setting/용접기'},
        { name : '밀링 Key-in', url : '/keyin/setting/밀링'},
        { name : '선반 Key-in', url : '/keyin/setting/선반'},
        { name : 'tab Key-in', url : '/keyin/setting/탭'},
        { name : '자재 Key-in', url : '/keyin/setting/자재'},

      ]} key={String(id)}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
              <Header title={ ' 기본 항목 설정'}/>
              <div style={{position:'absolute',display:'inline-block',top:0, right:0}}>
              <MonitoringOptionButton title={'항목 추가하기'} color={'#b3b3b3'} onClickEvent={()=>{alert('현재 기능을 사용 할 수 없습니다.')}}/>
               </div>
          </div>
          <WrapBox>
            {
              id === '프레스' ?
              <>
           
              <img src={TEMP_IMG_1} />
              <div style={{position:'relative'}}>
              <Header title={'항목 리스트'}/>
              </div>
              <img src={TEMP_IMG_2} />
              </>
              :
              null
            }
          </WrapBox>
        
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
    img{
      width: 100%;
    }
`

export default SettingKeyin;
