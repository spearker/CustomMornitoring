
import React, { useEffect, useState, useContext, useCallback } from 'react';
import Styled, { withTheme } from 'styled-components'
import { BrowserRouter as Router, Redirect, Link} from 'react-router-dom';
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import Axios from 'axios';
import { read } from 'fs';
import SuperNavigation from '../../Components/Navigation/SuperNavigation';

// 회사 등록 페이지

const SuperRegister = () => {

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwCheck, setPwCheck] = useState<string>('');
  const [error, setError] = useState<string>('-- 에러--');
  const [code, setCode] = useState<string>('');
  const [compayList, setCompanyList] = useState<object[]>([]);

  //const { tempEmail } = useContext(UserDataContext); //인증된 이메일

  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();

    //window.location.href= "/super/list" //TODO: 지울것

    //발리데이션
    if(pw == '' || name == '' || email ==='' || username === ''){
      alert('필수 항목을 모두 입력해주세요.')
      return
    } 
    if(pw.length < 6 || pw !== pwCheck){
      alert('비밀번호를 확인해주세요. (6자 이상)')
      setPwCheck('')
      return
    }
    if(email.length < 6 || !email.includes('@')){
      alert('이메일 형식을 확인해주세요.')
      setEmail('')
      return
    }

    // 이메일 보내기 
    Axios.post(BASE_URL + '/v2/super/company/create', {
      company_name: name,
      user_email: email,
      user_name: username,
      user_password: pw

    })
    .then(function (res) {
      console.log(res);
      if(res.status === 200){
        //welcome/auth로 이동 
        alert('등록 완료 되었습니다!')
        setUsername('')
        setEmail('')
        setPw('')
        setPwCheck('')
        setName('')
    

      }else{
        //기타 에러처리 
        alert('SERVER ERROR CHECK : ' + res.status)
        
      }
    })
    .catch(function (error) {
      console.log(error);
      alert('SERVER ERROR CHECK : ' + error)
    });
    

  },[email, name, pw, username, pwCheck])

 

  return (

    
        <FullPageDiv>
            <SuperNavigation position={'static'} />
            <InnerDiv >
              <p style={{fontSize:36, marginTop:108}}>회사등록 </p>
              <div style={{marginTop:34, marginBottom:160}}>
              <form onSubmit={onsubmitForm}>
                  <label>Company Name</label> 
                  <WelcomeInputBox type="text" style={{marginTop:8, marginBottom:20, width: 327}}
                      value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setName(e.target.value)}} placeholder="회사 이름을 입력해주세요."/>
                  <label>Admin ID (e-mail)</label> 
                  <WelcomeInputBox type="text" style={{marginTop:8, marginBottom:20, width: 327}}
                      value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setEmail(e.target.value)}} 
                      placeholder="이메일을 입력해주세요."/>
                  <label>Admin Name</label> 
                  <WelcomeInputBox type="text" style={{marginTop:8, marginBottom:20, width: 327}}
                      value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setUsername(e.target.value)}} placeholder="관리자 이름을 입력해주세요."/>
                  <label>Admin Password</label> 
                  <WelcomeInputBox type="password"  style={{marginTop:8, marginBottom:20, width: 327}}
                      value={pw} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setPw(e.target.value)}} 
                      placeholder="비밀번호를 입력해주세요."/>
                  <label>Admin Password Check</label> 
                  <WelcomeInputBox type="password"  style={{marginTop:8, marginBottom:40, width: 327}}
                      value={pwCheck} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setPwCheck(e.target.value)}} 
                      placeholder="한번 더 비밀번호를 입력해주세요."/>    
                
                
                  <ButtonBox name={'등록하기'}/> 
                 
              </form>
              </div>
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
  max-width: 327px;
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

export default SuperRegister;