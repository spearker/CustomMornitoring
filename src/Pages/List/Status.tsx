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

import StatusTable from '../../Components/Table/StatusTable';
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import { useUser } from '../../Context/UserContext';

// 기계 및 장비 현황
const StatusList = () => {


  const [list, setList] = useState<IStatus[]>([]);
  const [option, setOption] = useState(0);
  const me = useUser();
  const optionList = [
    "등록순", "이름순", "라인순",
  ]
  const index = {
    status:'상태',
    name:'이름',
    code:'번호',
    manufacturer:'제조사',
    manufacturer_code:'제조사 번호',
  }


  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback(async (filter:number)=>{
    setOption(filter)
    ////alert(`선택 테스트 : 필터선택 - filter : ${filter}` )
    //return;
    const results = await getRequest('http://203.234.183.22:8299/api/v1/status/list/' + filter, getToken(TOKEN_NAME))

    if(results === false){
      //alert('8087 포트 : 데이터를 불러 올 수 없습니다.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
        //alert('8087 포트 : 데이터를 불러 올 수 없습니다.')
      }
    }
  },[option, list])

  useEffect(()=>{
    onClickFilter(0)

  },[])

  const onClickModify = useCallback((id, type)=>{
    console.log('--select id : ' + id)
    if(type !== 'submachine'){
      window.location.href=`/update/machine?pk=${id}`
    }else{ //peripheral
      window.location.href=`/update/submachine?pk=${id}`
    }

  },[])


  return (
      <DashboardWrapContainer>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'기계 및 장비 현황'}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              {
                me.is_admin ?
                <>

              <SmallButtonLink name="+ 기계 추가" link="/register/machine"/>
              <SmallButtonLink name="+ 주변장치 추가" link="/register/submachine"/>
              </>
              :
              null}
              <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={onClickFilter}/>
            </div>
          </div>

          <StatusTable widthList={['100px', '140px','240px', '140px', '140px']} indexList={index} keyName={'pk'} buttonName='수정하기' contents={list} onClickEvent={me.is_admin ? onClickModify :null}/>

        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}

export default StatusList;
