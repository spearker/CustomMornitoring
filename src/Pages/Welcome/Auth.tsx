import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BG_COLOR_SUB2, POINT_COLOR} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'

// 회원가입을 위한 이메일 입력 페이지

const Auth = () => {

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [num4, setNum4] = useState('');

  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();
    window.location.href= "/signup" //TODO: 지울것
    // 번호 보내기
    // res body 에 담긴 email 컨텍스트에 저장 tempEmail

  },[num1, num2, num3, num4])

  const onChangeNum1 = useCallback((e) => {
    if(isNaN(e.target.value)){return;}
    setNum1(e.target.value);
    if(e.target.value !== ''){
        document.getElementById("2")!.focus();
    }

}, [num1]);

const onChangeNum2 = useCallback((e) => {
    if(isNaN(e.target.value)){return;}
    setNum2(e.target.value);
    if(e.target.value !== ''){
        document.getElementById("3")!.focus();
    }
}, [num2]);

const onChangeNum3 = useCallback((e) => {
    if(isNaN(e.target.value)){return;}
    setNum3(e.target.value);
    if(e.target.value !== ''){

        document.getElementById("4")!.focus();
    }

}, [num3]);

const onChangeNum4 = useCallback((e) => {
    if(isNaN(e.target.value)){return;}
    setNum4(e.target.value);
    if(e.target.value !== ''){

        document.getElementById("4")!.focus();
    }

}, [num4]);

  useEffect(()=>{

  },[])

  return (


        <FullPageDiv>
            <WelcomeNavigation />
            <InnerDiv >
              <p style={{fontSize:36, marginTop:108}}>Sign Up</p>
              <form onSubmit={onsubmitForm} style={{marginTop:34, marginBottom:320}}>
                <p style={{marginBottom:39}}>메일로 발송된 인증번호를 입력해주세요!</p>
                <div style={{marginBottom:32, textAlign:'center'}}>
                {num1 === '' ?
                    <InputBox id="1" maxLength={1} name="num1" type="text" value={num1} onChange={onChangeNum1} placeholder="" required/>
                    :
                    <InputBoxAfter id="1"  maxLength={1}  name="num1" type="text" value={num1} onChange={onChangeNum1} placeholder="" required/>
                }
                {num2 === '' ?
                    <InputBox id="2"   maxLength={1} name="num2" type="text" value={num2} onChange={onChangeNum2} placeholder="" required/>
                    :
                    <InputBoxAfter id="2" maxLength={1} name="num1" type="text" value={num2} onChange={onChangeNum2} placeholder="" required/>
                }
                {num3 === '' ?
                    <InputBox id="3"   maxLength={1} name="num3" type="text" value={num3} onChange={onChangeNum3} placeholder="" required/>
                    :
                    <InputBoxAfter id="3" maxLength={1} name="num3" type="text" value={num3} onChange={onChangeNum3} placeholder="" required/>
                }
                {num4 === '' ?
                    <InputBox id="4"  maxLength={1} name="num4" type="text" value={num4} onChange={onChangeNum4} placeholder="" required/>
                    :
                    <InputBoxAfter id="4"  maxLength={1} name="num4" type="text" value={num4} onChange={onChangeNum4} placeholder="" required/>
                }
                <br/>
                </div>
                <div style={{textAlign:'center', fontSize:12}}>
                  <p >이메일을 받지 못하셨나요?</p>
                  <a href="/email" style={{marginBottom:55, marginTop:5, display:'block', textDecoration:'underline'}}>인증번호 재전송</a>

                </div>
                 <ButtonBox name={'이메일 인증하기'} />
              </form>
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

const InputBox = Styled.input`
    width: 55px;
    height: 55px;
    border: 1px solid #717171 !important;
    color: black;
    font-size: 40px;
    background-color: ${BG_COLOR_SUB2};
    text-align: center;
    -webkit-appearance: none;
    margin-left: 9px;
    margin-right: 9px;
    appearance: none !important;
`
const InputBoxAfter = Styled.input`
    width: 55px;
    height: 55px;
    border: 1px solid ${POINT_COLOR} !important;
    background-color: ${POINT_COLOR};
    color: black;
    font-size: 40px;
    text-align: center;
    -webkit-appearance: none;
    margin-left: 9px;
    margin-right: 9px;
    appearance: none !important;
`

export default Auth;
