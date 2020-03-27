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
import { ROUTER_MANAGE } from '../../Common/routerset';

// 직원 리스트
const Members = () => {

  const [list, setList] = useState<IMmember[]>([]);
 
  const index = {
    name:'성명',
    appointment:'직급',
    year:'연차',
    join_date:'입사일',
    join_type:'채용형태',
    email:'이메일',
    status:'상태'
  }

  /**
   * getList()
   * 직원 리스트 조회
   * @param {string} url 요청 주소
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getList = useCallback(async ()=> {
    const results = await getRequest('http://211.208.115.66:8088/api/v1/member/list/0', getToken(TOKEN_NAME))

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
          setList(results.results)
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[list])



  useEffect(()=>{

    //setList(dataSet.memberList); //TODO: 테스트용. 지울것.
    getList();

  },[])

  const onClickModify = useCallback((id)=>{

    console.log('--select id : ' + id)
    window.location.href=`/manage/members/update?id=${id}`
  
  },[])

  return (
      <DashboardWrapContainer>
        <SubNavigation list={ROUTER_MANAGE}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'구성원 관리'}/>
          </div>
          <NormalTable indexList={index} keyName={'pk'} contents={list} buttonName='수정하기' onClickEvent={onClickModify}/>
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}

export default Members;