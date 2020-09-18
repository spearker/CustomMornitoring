import React, {useCallback, useEffect, useState} from 'react';
import {getParameter, postRequestWithNoToken} from '../../Common/requestFunctions';
import WelcomeContainer from '../../Containers/WelcomeContainer';
import WelcomeInput from '../../Components/Input/WelcomeInput';
import {useTranslation} from 'react-i18next';
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
  const onsubmitForm = useCallback(async ()=>{

    //window.location.href= "/complete" //TODO: 지울것

    //발리데이션
    if(pw == '' ){
      //alert(t('errorAllSubmit'))
      return
    }
    if(pw.length < 6 || pw !== pwCheck){
      //alert(t('errorPassord'))
      setPwCheck('')
      return
    }
    let data: object = {
      email: getParameter('email'),
      password: pw,
      auth_code: getParameter('authcode'),
    }
    const results = await postRequestWithNoToken('http://203.234.183.22:8299/user/password/change', data)

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
        //alert(t('successChange'))
        window.location.href= "/login"

      }else if(results.status === 1001){
        //alert(t('errorUse'))
        setEmail('')
        window.location.href= "/login"
      }else{
        //기타 에러처리
        //alert('변경 실패하였습니다.')
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
