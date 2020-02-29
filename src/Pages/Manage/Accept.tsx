import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';

// 멤버 승인
const AcceptMember = () => {

  const [list, setList] = useState<[]>([]);
  const [option, setOption] = useState(0);

  const optionList = [
    "등록순"
  ]
  const index = {
    email:'유저 이메일',
    name:'유저 이름',
  }


  useEffect(()=>{

    setList(dataSet.acceptList); //TODO: 테스트용. 지울것.

    Axios.get(BASE_URL + '/api/v1/user/load/temp', { 'headers': { 'Authorization': getToken() } }) // BASE_URL + '주소'
    .then(function (res: IServerResponse) {
      console.log(res);
      if(res.data.status === 200){
        const data = res.data.results
        setList(data)
      }else {
        //alert('세션이 만료되었습니다. 잘못된 접근입니다.')
        //window.location.href= "/login" 
      }
    })
    .catch(function (error) {
      console.log(error);
      //alert('목록을 불러 올 수 없습니다')
    });



  },[])

  const onClickAccept = useCallback((id)=>{

    console.log('--select id : ' + id)
    Axios.post(BASE_URL + '/api/v1/user/accept', {
      user_pk:id
    },{ 'headers': { 'Authorization': getToken() } }) // BASE_URL + '주소'
    .then(function (res: IServerResponse) {
      console.log(res);
      if(res.data.status === 200){
        alert('성공적으로 승인되었습니다.')
        const data = res.data.results
        setList(data)
      }else {
        //alert('세션이 만료되었습니다. 잘못된 접근입니다.')
        //window.location.href= "/login" 
      }
    })
    .catch(function (error) {
      console.log(error);
      //alert('목록을 불러 올 수 없습니다')
    });



  },[])

  return (
      <DashboardWrapContainer>
        <FullPageDiv>
          <div style={{position:'relative'}}>
            <Header title={'승인 신청 리스트'}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={setOption}/>
            </div>
          </div>
          <NormalTable indexList={index} keyName={'pk'} contents={list} buttonName='가입 승인' onClickEvent={onClickAccept}/>
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