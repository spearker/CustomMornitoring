import React, {useCallback, useEffect, useState} from 'react';
import {postRequestWithNoToken} from '../../Common/requestFunctions';
import WelcomeContainer from '../../Containers/WelcomeContainer';
import WelcomeInput from '../../Components/Input/WelcomeInput';
import BasicColorButton from '../../Components/Button/BasicColorButton';
import {useTranslation} from 'react-i18next';

// 회원가입을 위한 이메일 입력 페이지

const Email = () => {

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [subDomain, setSubDomain] = useState<string>(window.location.hostname);
  const [check, setCheck] = useState<boolean>(false);
  const {t} = useTranslation();
;
  /**
   * onsubmitForm()
   * : 회원가입 확인을 위한 메일 인증
   * @param {string} email 이메일
   * @returns X
   */
  const onsubmitForm = useCallback(async ()=>{

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
      email : email,
      base_url: subDomain
    }

    const results = await postRequestWithNoToken('http://112.186.20.155:8299/email/send', data)
    console.log(results)
    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
        alert('인증메일이 발송되었습니다. 메일함을 확인해주세요.')
      }else if(results.status === 1001 || results.data.status === 1002){
        alert('가입 불가능한 이메일 입니다.')
      }else{
        //TODO:  기타 오류
      }
    }


  },[email, check, error, subDomain])

  useEffect(()=>{

  },[])

  return (
        <WelcomeContainer>
          <div style={{width:320, textAlign:'left'}}>
            <p className="p-eng" style={{fontSize:36, marginBottom:26}}>Sign Up</p>
            <WelcomeInput type="email" value={email} title={'ID (e-mail)'} onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>): void =>{setEmail(e.target.value)}} hint={t('enterEmail')}/>
            <div style={{display:'flex', alignItems:'center',marginTop:6}}>
              <div style={{paddingLeft:1, paddingTop:5}}>
                <input type="checkbox" id="cb" onClick={(e)=>{setCheck(!check)}}/>
                <label htmlFor="cb"></label>
              </div>
              <div>
                <span style={{paddingLeft:7,fontSize:14}}>{t('checkRules')}</span>
              </div>
            </div>
            <div style={{textAlign:'center',marginTop:52}}>
                  <BasicColorButton onClickEvent={onsubmitForm} width="100%" name={t('signUp')} />
            </div>
          </div>
        </WelcomeContainer>

  );
}



export default Email;
