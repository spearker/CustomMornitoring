
import React, { useEffect, useState, useContext, useCallback } from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import {useUser, useUserDispatch} from '../../Context/UserContext';
import Axios from 'axios';
import { read } from 'fs';
import { postRequestWithNoToken } from '../../Common/requestFunctions';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import WelcomeContainer from '../../Containers/WelcomeContainer';
import WelcomeInput from '../../Components/Input/WelcomeInput';
import { useTranslation } from 'react-i18next';
import BasicColorButton from '../../Components/Button/BasicColorButton';


const ChangePw = () => {

  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwCheck, setPwCheck] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [auth, setAuth] = useState<string>('');
  const {t} = useTranslation();
  /**
   * onsubmitForm()
   * : 비밀번호 변경
   * @param {string} email 이메일
   * @param {string} pw 패스워드
   * @param {string} pwCheck 패스워드 확인
   * @param {string} auth 이메일 인증코드 
   * @returns X
   */
  const onsubmitForm = useCallback(()=>{
  
    //window.location.href= "/complete" //TODO: 지울것

    //발리데이션
    if(pw == '' ){
      alert(t('errorAllSubmit'))
      return
    } 
    if(pw.length < 6 || pw !== pwCheck){
      alert(t('errorPassord'))
      setPwCheck('')
      return
    }
    let data: object = {
      email: email,
      password: pw,
      auth_code: auth,
    }
    const results = postRequestWithNoToken(BASE_URL + '/user/register', data)

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
        alert(t('successChange'))
        window.location.href= "/login" 
        
      }else if(results.status === 1001){
        alert(t('errorUse'))
        setEmail('')
        window.location.href= "/login" 
      }else{
        //기타 에러처리 
  
      }
    }

  },[email, pw, pwCheck, auth])

  useEffect(()=>{
      //setEmail(tempEmail);
      //setAuth(tempAuth);

  },[])

  return (
    <WelcomeContainer >
      <div style={{width:320, textAlign:'left'}}>
            <p className="p-eng" style={{fontSize:36, marginBottom:26}}>Change Passord</p>
            <WelcomeInput type="password" value={pw} title={'Password'} onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>): void =>{setPw(e.target.value)}} hint={t('enterPassword')}/>
            <WelcomeInput type="password" value={pwCheck} title={'Confirm Password'} onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>): void =>{setPwCheck(e.target.value)}} hint={t('enterPasswordRe')}/>

            <div style={{textAlign:'center',marginTop:52}}>
                  <BasicColorButton onClickEvent={onsubmitForm} width="100%" name={t('changePassword')} />
            </div>

      </div>
    </WelcomeContainer>
      
  );
}

export default ChangePw;