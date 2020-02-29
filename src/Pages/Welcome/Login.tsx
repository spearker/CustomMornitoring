import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import {useUserDispatch, useUser} from '../../Context/UserContext';
import { setToken } from '../../Common/tokenFunctions';
import { postRequestWithNoToken } from '../../Common/requestFunctions';

// 로그인 페이지 
const Login = () => {

  const dispatch = useUserDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  /**
   * onsubmitForm()
   * : 로그인
   * @param {string} email 이메일
   * @param {string} password 패스워드
   * @returns X
   */
  const onsubmitForm = useCallback(async (e)=>{
    e.preventDefault();

    //window.location.href= "/complete" //TODO: 지울것
    //발리데이션
    if(password == '' || email ==='' ){
      alert('이메일과 패스워드를 입력해주세요.')
      return
    }
    
    let data: object = {
      email : email,
      password : password
    }
    const results = await postRequestWithNoToken(BASE_URL + '/user/login', data)

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
        setToken(TOKEN_NAME, results.data.token);
        dispatch({
          type: 'SET_USER',
          data: {
            pk: results.data.pk,
            email: results.data.email,
            is_admin: results.data.is_admin,
            appointment: results.data.appointment,
            name: results.data.name,
            profile_img : results.data.profile_img,
            is_login : true,
          }
        });
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 패스워드 확인
      }else{
        //TODO:  기타 오류
      }

    }

  },[email, password])
  
  
  useEffect(()=>{
   
  },[])

  return (

       
    
        <FullPageDiv>
            <WelcomeNavigation position={'static'} />
            <InnerDiv >
              <p style={{fontSize:36, marginTop:108}}>Log In</p>
              <div style={{marginTop:34}}>
              <form onSubmit={onsubmitForm}>
                  <label >ID (e-mail)</label> 
                  <WelcomeInputBox type="text"  style={{marginTop:8, marginBottom:20, width: 327}}
                      value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setEmail(e.target.value)}} placeholder="이메일을 입력해주세요."/>
                  <label>Password</label> 
                  <WelcomeInputBox type="password"  style={{marginTop:8,  marginBottom:72}}
                      value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{setPassword(e.target.value)}} placeholder="비밀번호를 입력해주세요."/>
                  <p style={{color:'#ff0057', fontSize:12, marginBottom:12, textAlign:'center'}}>{error}</p>
                  
                  <ButtonBox name={'로그인'} />
              </form>
              <div style={{textAlign:'center',marginBottom:286, marginTop:17}}>
                    <a href="/forgot">비밀번호 찾기</a>
                    <span style={{paddingLeft:8, paddingRight:8}}>|</span>
                    <a href="/email">회원가입</a>
                  </div>
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
export const WelcomeInputBox = Styled.input`
  
    border: solid 1px #b3b3b370;
    font-size: 15px;
    padding: 15px;
    width: calc(100% - 30px) !important;
    background-color: transparent;
    color: white;
`

export default Login;