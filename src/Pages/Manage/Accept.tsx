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
  const getList = useCallback(()=> {
    const results = getRequest(BASE_URL + '/list/line', getToken(TOKEN_NAME))

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

  const onClickAccept = useCallback((id)=>{

    console.log('--select id : ' + id)
   

  },[])

  return (
      <DashboardWrapContainer>
        <FullPageDiv>
          <div style={{position:'relative'}}>
            <Header title={'승인 신청 리스트'}/>
          </div>
          <NormalTable indexList={index} keyName={'pk'} contents={list} buttonName='가입승인' onClickEvent={onClickAccept}/>
        </FullPageDiv>
      </DashboardWrapContainer>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default AcceptMember;