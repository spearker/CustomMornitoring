import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import {useUserDispatch, useUser} from '../../Context/UserContext';
import Axios from 'axios';
import { setToken } from '../../Common/getToken';

// 로그인 페이지 
const Login = () => {

  const dispatch = useUserDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const [error, setError] = useState<string>('-- 에러--');
  const setUserInfo = useUser();

  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();

    
    //window.location.href= "/complete" //TODO: 지울것

    //발리데이션
    if(password == '' || email ==='' ){
      alert('이메일과 패스워드를 입력해주세요.')
      return
    } 

    // 이메일 보내기 
    Axios.post(BASE_URL + '/user/login', {
      email: email,
      password: password
    })
    .then(function (res: IServerResponse) {
      console.log(res);
      if(res.data.status === 200){

        console.log(res.data.results)
        alert('성공적으로 로그인되었습니다.')
        const data = res.data.results

        // 토큰 저장
        setToken(data.token);
        // 유저정보 저장
        dispatch({
          type: 'SET_USER',
          data: {
            pk: data.pk,
            email: data.email,
            is_admin: data.is_admin,
            appointment: data.appointment,
            name: data.name,
            profile_img : data.profile_img,
            is_login : true,
          }
        });
    
        window.location.href= "/dashboard" 
      }else if(res.data.status === 1001 || res.data.status === 1002){
        alert('이메일과 패스워드를 확인해주세요')
        setPassword('')

      }else{
        //기타 에러처리 
        alert('SERVER ERROR CHECK : ' + res.data.status)
  
      }
    })
    .catch(function (error) {
      console.log(error);
      alert('SERVER ERROR CHECK : ' + error)
    });
  


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