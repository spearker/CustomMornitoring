import React, { useEffect, useState, useContext, useCallback } from 'react';
import Styled, { withTheme } from 'styled-components'
import { BrowserRouter as Router, Redirect, Link} from 'react-router-dom';
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import Axios from 'axios';
import { read } from 'fs';

// 회원가입을 위한 이메일 입력 페이지 

const Email = () => {

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);

  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();
    setError('')
    //window.location.href= "/auth" //TODO: 지울것
    if(email.length < 6 || !email.includes('@')){
      alert('이메일 형식을 확인해주세요.')
      setEmail('')
      return
    }
    if(!check){
      alert('서비스 이용약관 및 정책에 동의해주세요.')
      return
    }
    // 이메일 보내기 
    Axios.post(BASE_URL + '/v2/email/send', {
      email: email,
    })
    .then(function (res: IServerResponse) {
      console.log(res);
      if(res.data.status === 200){
        //welcome/auth로 이동 
        console.log(res.data.results)
        alert('인증되었습니다. 메일함을 확인해주세요.')
        setError()
      }else if(res.data.status === 1002){
        alert('이미 사용중인 이메일 입니다.')
        setEmail('')
      }else{
        //기타 에러처리 
        alert('SERVER ERROR CHECK : ' + res.data.status)
        setEmail('')
        
      }
    })
    .catch(function (error) {
      console.log(error);
      alert('SERVER ERROR CHECK : ' + error)
    });
    

  },[email, check, error])

  useEffect(()=>{
   
  },[])

  return (

    
    
        <FullPageDiv>
            <WelcomeNavigation position={'static'} />
            <InnerDiv >
              <p style={{fontSize:36, marginTop:108}}>Sign Up</p>
              <div style={{marginTop:34, marginBottom:320}}>
              <form onSubmit={onsubmitForm}>
                  <label style={{fontSize: 10, fontWeight:700}}>ID (e-mail)</label> 
                  <WelcomeInputBox type="text"  style={{marginTop:8, marginBottom:20, width: 327}}
                      value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setEmail(e.target.value)}} placeholder="이메일을 입력해주세요."/>
                      <div style={{display:'flex'}}>
                        <div>
                          
                          <input type="checkbox" id="cb" onClick={(e)=>{setCheck(!check)}}/>
                          <label htmlFor="cb"></label>
                        </div>
                        <div>
                          <span style={{paddingLeft:7,fontSize:12}}>이용약관과 개인정보 정책에 동의합니다.</span> 
              
                        </div>
                        
                      </div>
                      <p style={{color:'#ff0057', fontSize:12, marginBottom:67, marginTop:75, textAlign:'center'}}>{error}</p>
                  <ButtonBox name={'이메일 인증하기'} /> 
                 
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

export default Email;