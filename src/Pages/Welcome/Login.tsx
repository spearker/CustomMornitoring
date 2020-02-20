import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import {useUserDispatch, useUser} from '../../Context/UserContext';
import Axios from 'axios';

// 로그인 페이지 
const Login = () => {

  const dispatch = useUserDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const [error, setError] = useState<string>('-- 에러--');
  const setUserInfo = useUser();

  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();

    //로그인 
    //TODO: 지울것
    window.location.href= "/dashboard" 
    dispatch({
      type: 'SET_USER',
      data: {
        pk: 'user_0002',
        email: 'sumin@sizl.co.kr',
        is_admin: true,
        appointment: 2,
        name: '홍길동',
        profile_img : 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2xMI/image/9vk0DHXiQYuN4RLiiLr8_02fIeE.jpg', 
        is_login : true,
      }
    });


    // 이메일 보내기 
    Axios.post(BASE_URL + '/api문서참고', {
      email: 'Fred',
      check: 'Flintstone'
    })
    .then(function (res) {
      console.log(res);
      if(res.status === 200){
        //세션 스토리지에 token 담기
        //로그인
      }else{
        //중복확인 에러처리 
        setError('이메일과 패스워드를 확인해주세요')
      }
    })
    .catch(function (e) {
      console.log(e);
      setError('로그인 할 수 없습니다')
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