import React, { useEffect, useState, useContext, useCallback } from 'react';
import Styled from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import { postRequestWithNoToken } from '../../Common/requestFunctions';

// 회원가입을 위한 이메일 입력 페이지 

const Email = () => {

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);

  /**
   * onsubmitForm()
   * : 비밀번호 확인을 위한 메일 인증
   * @param {string} email 이메일
   * @returns X
   */
  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();

    setError('')

    if(email.length < 6 || !email.includes('@')){
      alert('이메일 형식을 확인해주세요.')
      setEmail('')
      return
    }
    if(!check){
      alert('서비스 이용약관 및 정책에 동의해주세요.')
      return;
    }
    let data: object = {
      email : email
    }
    const results = postRequestWithNoToken(BASE_URL + '/password/send', data)

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
        
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }


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
                          <span style={{paddingLeft:7,fontSize:12}}>서비스 이용약관과 개인정보 정책에 동의합니다.</span> 
              
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