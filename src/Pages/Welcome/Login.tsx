import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled from 'styled-components'
import IMG_BG from '../../Assets/Images/img_welcome_bg.png'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import {useUserDispatch, useUser} from '../../Context/UserContext';
import { setToken } from '../../Common/tokenFunctions';
import { postRequestWithNoToken, getRequestWithNoToken } from '../../Common/requestFunctions';
import WelcomeInput from '../../Components/Input/WelcomeInput';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BasicColorButton from '../../Components/Button/BasicColorButton';
import WelcomeContainer from '../../Containers/WelcomeContainer';
import { openPopup } from '../../Common/popupFunctions';
import { usePopupDispatch } from '../../Context/PopupContext';

// 로그인 페이지 
const Login = () => {

  const dispatch = useUserDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const {t} = useTranslation();
  const dispatchp = usePopupDispatch();
  /**
   * onsubmitForm()
   * : 로그인
   * @param {string} email 이메일
   * @param {string} password 패스워드
   * @returns X
   */
  const onsubmitForm = useCallback(async ()=>{

    let data: object = {
      email: email,
      password: password,
    }
    const results = await postRequestWithNoToken(BASE_URL + '/user/login', data)

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
        setToken(TOKEN_NAME, results.results.token)
        window.location.href= "/dashboard"
      }else if(results.status === 1001 ||results.status === 1002 ){
        alert('아이디와 패스워드를 확인하세요.')
      }else if(results.status === 1003){
        alert('승인 대기중인 이메일 입니다. 관리자 승인 후 로그인 할 수 있습니다.')
       
      }else{
        //기타 에러처리 
  
      }
    }

  },[email, password])

  /**
   * getServerStatus()
   * : 로그인
   * @param {string} email 이메일
   * @param {string} password 패스워드
   * @returns X
   */
  const getServerStatus = useCallback(async ()=>{

    const results = await getRequestWithNoToken(BASE_URL + '/server/status')
    if(results === false){
      dispatchp({
          type: 'OPEN_POPUP',
          data: {
              type: 'error',
              contents: '임시 알림 : 현재 백서버가 닫혀있습니다. - 로그인 및 테스트 불가'
          }
      })
      setError('테스트 서버 상태 : 접속 불가')
    }else{
      setError('테스트 서버 상태 : 접속 가능')
    }

  },[])
  
  
  useEffect(()=>{
    getServerStatus()
  },[])

  return (
      <WelcomeContainer>
          <form style={{width:320, textAlign:'left'}}>
            <p className="p-eng" style={{fontSize:36, marginBottom:26}}>Log In</p>
            <WelcomeInput type="email" value={email} title={'ID (e-mail)'} onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>): void =>{setEmail(e.target.value)}} hint={t('enterEmail')}/>
            <WelcomeInput type="password" value={password} title={'Password'} onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>): void =>{setPassword(e.target.value)}} hint={t('enterPassword')}/>
            <div style={{textAlign:'center',marginTop:38}}>
                  <p style={{marginBottom:10, color:'pink'}}>{error}</p>
                  <BasicColorButton onClickEvent={onsubmitForm} width="100%" name={t('login')} />
                  <div style={{marginTop:13, marginBottom:24}}>
                    <Link to="/forgot">{t('findPassword')}</Link>
                    <span style={{paddingLeft:8, paddingRight:8}}>|</span>
                    <Link to="/email">{t('signUp')}</Link>
                  </div>
                  
            </div>
          </form>
      </WelcomeContainer>
      
  );
}



export default Login;