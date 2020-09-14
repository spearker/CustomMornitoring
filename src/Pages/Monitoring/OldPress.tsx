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

import MonitoringTable from '../../Components/Table/MonitoringTable';
import icCircleRotate from '../../Assets/Images/ic_circle_rotate.png'
import HeaderLive from '../../Components/Text/HeaderLive';
import MonitoringTableCommon from '../../Components/Table/MonitoringTableCommon';
import MonitoringDropdown from '../../Components/Dropdown/MonitoringDropdown';
import MonitoringTableFilter from '../../Components/Table/MonitoringTableFilter';

// 프래스 모니터링
const PressMonitoring = () => {

  const [list, setList] = useState<[]>([]);
  const [option, setOption] = useState<number | string>('all');
  const [optionList, setOptionList] = useState<number[]>();
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false);

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

  /**
   * getData()
   * 모니터링 데이터 조회
   * @param {string} url 요청 주소
   * @returns X
   */
  const getList = useCallback(async()=>{
    if (document.hidden) { // Opera 12.10 and Firefox 18 and later support
      console.log('-- hidden browser -- ')
      //setCount(999)
      return
    }

    console.log('-- monitoring data load -- ' )
    const res = await getRequest(`http://192.168.0.14:8088/api/v1/monitoring?type=press&from=mobile`, getToken(TOKEN_NAME))
    setIsFirstLoad(true)
    if(res === false){
      //alert('서버에서 데이터를 받아올 수 없습니다.')

      window.location.href="/dashboard"
    }else{
      if(res.status === 200){
         const data = res.results;
         setList(data);
         ////alert(data.info_list);
         console.log(data.info_list)
         const arr = data[0].info_list.map((v, i)=>{
          return( v['title'] )
         })
         setOptionList(arr)
      }else{
        //alert('서버에서 데이터를 받아올 수 없습니다.')

        window.location.href="/dashboard"
      }
    }
  },[list, optionList]);

  useEffect(()=>{
    getList()
    setIsFirstLoad(true)
    //const interval = setInterval(() => { getListTemp(tab)}, 1800)
    //setTimer(interval);
    return () => {
        //removeTimer();
        //clearInterval(interval);
        //setTimer(null)
      };
    },[])
    useEffect(()=>{

      const interval = setInterval(() => { getList();  }, 4000)

      return () => {

          console.log('-- monitoring end -- ' )
          clearTimeout(interval);
          //setTimer(null)
        };
  },[])



  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback( (filter:number | string)=>{
    setOption(filter);

  },[option, list])

  return (
      <DashboardWrapContainer>

      </DashboardWrapContainer>

  );
}

export default PressMonitoring;
