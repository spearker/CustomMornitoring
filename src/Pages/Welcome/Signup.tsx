
import React, { useEffect, useState, useContext, useCallback } from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import {useUser, useUserDispatch} from '../../Context/UserContext';
import Axios from 'axios';
import { read } from 'fs';

// 회원가입 정보 입력 페이지 (메일 인증 후 )

const Signup = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwCheck, setPwCheck] = useState<string>('');
  const [error, setError] = useState<string>('-- 에러--');
  const [code, setCode] = useState<string>('');

  //const { tempEmail } = useContext(UserDataContext); //인증된 이메일

  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();

    window.location.href= "/complete" //TODO: 지울것

    // 이메일 보내기 
    Axios.post(BASE_URL + '/api문서참고', {
      email: 'Fred',
      check: 'Flintstone'
    })
    .then(function (res) {
      console.log(res);
      if(res.status === 200){
        //welcome/auth로 이동 
        
      }else{
        //중복확인 에러처리 
        setError('이메일과 패스워드를 확인해주세요')
        
      }
    })
    .catch(function (error) {
      console.log(error);
      setError('로그인 할 수 없습니다')
    });
    

  },[email, name, pw, pwCheck])

  useEffect(()=>{
      //setEmail(tempEmail);
  },[])

  return (

    
    
        <FullPageDiv>
            <WelcomeNavigation position={'static'} />
            <InnerDiv >
              <p style={{fontSize:36, marginTop:108}}>Sign Up</p>
              <div style={{marginTop:34, marginBottom:108}}>
              <form onSubmit={onsubmitForm}>
                  <label>Name</label> 
                  <WelcomeInputBox type="text" style={{marginTop:8, marginBottom:20, width: 327}}
                      value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setName(e.target.value)}} placeholder="이름을 입력해주세요."/>
                  <label>ID (e-mail)</label> 
                  <WelcomeInputBox type="text" readOnly style={{marginTop:8, marginBottom:20, width: 327}}
                      value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setEmail(e.target.value)}} 
                      placeholder="이메일을 입력해주세요."/>
                  <label>Password</label> 
                  <WelcomeInputBox type="password"  style={{marginTop:8, marginBottom:20, width: 327}}
                      value={pw} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setPw(e.target.value)}} 
                      placeholder="비밀번호를 입력해주세요."/>
                  <label>Password Check</label> 
                  <WelcomeInputBox type="password"  style={{marginTop:8, marginBottom:20, width: 327}}
                      value={pwCheck} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setPwCheck(e.target.value)}} 
                      placeholder="한번 더 비밀번호를 입력해주세요."/>    
                  <label>Company Code (* 담당자에게 문의)</label> 
                  <WelcomeInputBox type="text"  style={{marginTop:8, marginBottom:20, width: 327}}
                      value={code} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setCode(e.target.value)}} 
                      placeholder="회사 코드를 입력해주세요."/>   
                  <p style={{color:'#ff0057', fontSize:12, marginBottom:14, marginTop:32, textAlign:'center'}}>{error}</p>
                  <ButtonBox name={'가입신청 하기'} /> 
                 
              </form>
              </div>
            </InnerDiv>
            <WelcomeFooter/>
        </FullPageDiv>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  min-height: calc(100vh - 213px);
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

export default Signup;