
import React, { useEffect, useState, useContext, useCallback } from 'react';
import Styled, { withTheme } from 'styled-components'
import { BrowserRouter as Router, Redirect, Link} from 'react-router-dom';
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import Axios from 'axios';
import { read } from 'fs';
import SuperNavigation from '../../Components/Navigation/SuperNavigation';
import NormalList from '../../Components/List/NormalList';
import NormalTable from '../../Components/Table/NormalTable';

// 회사 조회 페이지

const SuperList = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwCheck, setPwCheck] = useState<string>('');
  const [error, setError] = useState<string>('-- 에러--');
  const [code, setCode] = useState<string>('');
  const [compayList, setCompanyList] = useState<object[]>([]);

  //const { tempEmail } = useContext(UserDataContext); //인증된 이메일
  const index = {
    pk:'PK',
    company_name:'회사 이름',
    created:'생성일',
    user_pk:'관리자 PK', 
    user_email:'관리자 이메일', 
    company_code:'회사코드'
  }
  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();

    //window.location.href= "/complete" //TODO: 지울것
  },[email, name, pw, pwCheck])

  useEffect(()=>{
    
    // 리슽트 받기
    Axios.get(BASE_URL + '/v2/super/company/load?page=1')
    .then(function (res: IServerResponse) {
      console.log(res);
      if(res.data.status === 200){
        //welcome/auth로 이동 
        console.log(res.data.results)
        setCompanyList(res.data.results)
      }else{
        //기타 에러처리 
        alert('SERVER ERROR CHECK : ' + res.data.status)
        
      }
    })
    .catch(function (error) {
      console.log(error);
      setError('로그인 할 수 없습니다')
    });
    
  },[])
  const onClickModify = useCallback((id)=>{

    console.log('--select id : ' + id)

  },[])
  return (
    
        <FullPageDiv>
            <SuperNavigation position={'static'} />
            <InnerDiv >
              <p style={{fontSize:20, marginTop:37, marginBottom:30}}>회사 조회 </p>
              <NormalTable indexList={index} keyName={'pk'} contents={compayList} onClickEvent={onClickModify}/>
  
              
            </InnerDiv>
            
        </FullPageDiv>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  min-height: 100vh;
  hegith: 100%;
  text-align:center;
  background-color: ${BG_COLOR_SUB2}
`

const InnerDiv = Styled.div`
  display:inline-block;
  width: 327px;
  height: 100%;
  width: 1100px;
  color: white;
  text-align:left;
 
  
`

 const WelcomeInputBox = Styled.input`
    
    border: solid 1px #b3b3b370;
    font-size: 15px;
    padding: 15px;
    width: calc(100% - 30px) !important;
    background-color: transparent;
    color: white;
`

export default SuperList;