import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled from 'styled-components'
import IMG_BG from '../../Assets/Images/img_welcome_bg.png'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import {useUserDispatch, useUser} from '../../Context/UserContext';
import { setToken } from '../../Common/tokenFunctions';
import { postRequestWithNoToken } from '../../Common/requestFunctions';
import WelcomeInput from '../../Components/Input/WelcomeInput';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BasicColorButton from '../../Components/Button/BasicColorButton';
import WelcomeContainer from '../../Containers/WelcomeContainer';

// 로그인 페이지 
const Login = () => {

  const dispatch = useUserDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const {t} = useTranslation();

  /**
   * onsubmitForm()
   * : 로그인
   * @param {string} email 이메일
   * @param {string} password 패스워드
   * @returns X
   */
  const onsubmitForm = useCallback(async ()=>{

    console.log('click')
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

    const results = postRequestWithNoToken(BASE_URL + '/email/login', data)

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
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
   

  },[email, password])
  
  
  useEffect(()=>{
   
  },[])

  return (
      <WelcomeContainer>
          <div style={{width:320, textAlign:'left'}}>
            <p className="p-eng" style={{fontSize:36, marginBottom:26}}>Log In</p>
            <WelcomeInput type="email" value={email} title={'ID (e-mail)'} onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>): void =>{setEmail(e.target.value)}} hint={t('enterEmail')}/>
            <WelcomeInput type="password" value={password} title={'Password'} onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>): void =>{setPassword(e.target.value)}} hint={t('enterPassword')}/>
            <div style={{textAlign:'center',marginTop:52}}>
                  <BasicColorButton onClickEvent={onsubmitForm} width="100%" name={t('login')} />
                  <div style={{marginTop:13, marginBottom:24}}>
                    <Link to="/forgot">{t('findPassword')}</Link>
                    <span style={{paddingLeft:8, paddingRight:8}}>|</span>
                    <Link to="/email">{t('signUp')}</Link>
                  </div>
                  
            </div>
          </div>
      </WelcomeContainer>
      
  );
}



export default Login;