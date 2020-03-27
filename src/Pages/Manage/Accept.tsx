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
import { getRequest, postRequest } from '../../Common/requestFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MANAGE } from '../../Common/routerset';

// 멤버 승인
const AcceptMember = () => {

  const [list, setList] = useState<[]>([]);
 
  const index = {
    email:'성명',
    name:'이메일',
  }

  /**
   * getList()
   * 승인요청 리스트 조회
   * @param {string} url 요청 주소
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getList = useCallback(async ()=> {
    const results = await getRequest('http://211.208.115.66:8088/api/v1/user/load/temp', getToken(TOKEN_NAME))

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

    //setList(dataSet.acceptList); //TODO: 테스트용. 지울것.
    getList();

  },[])

  const onClickAccept = useCallback(async(id)=>{

    console.log('--select id : ' + id)
    const results = await postRequest('http://211.208.115.66:8088/api/v1/user/accept', {user_pk:id} ,getToken(TOKEN_NAME))

    if(results === false){
      alert('승인 실패하였습니다. 관리자에게 문의하세요.')
        //setList([""])
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
        
        alert('승인 되었습니다.')
        getList()
      }else{
        alert('승인 실패하였습니다. 관리자에게 문의하세요.')
      }
    }

  },[])

  return (
      <DashboardWrapContainer>
        <SubNavigation list={ROUTER_MANAGE}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'승인 신청 리스트'}/>
          </div>
          <NormalTable indexList={index} keyName={'pk'} contents={list} buttonName='가입승인' onClickEvent={onClickAccept}/>
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}

export default AcceptMember;