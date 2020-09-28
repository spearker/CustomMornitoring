import React, {useEffect} from 'react';
import Styled from 'styled-components'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    hint: string,
    type: string,
    value: number | string,
    onChangeEvent?: (e: React.ChangeEvent<HTMLInputElement>) =>void
}

const WelcomeInput = ({title, hint, type, value, onChangeEvent}: IProps) => {

    const onCheckKor = (event) => {
        event = event || window.event;
        if((/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g).test(event.target.value)){
           alert('한글은 비밀번호로 사용할 수 없습니다.')
        }
        var keyID = (event.which) ? event.which : event.keyCode;
        if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 )
            return;
        else
            event.target.value = event.target.value.replace( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");

    }
  useEffect(()=>{

  },[])

  return (

        <>
            <label className="p-eng" style={{fontSize: 14}}>{title}</label>
            {
                type === 'password' ?
                <WelcomeInputBox type={type} onKeyUp={(e)=>onCheckKor(e)} style={{imeMode:'disabled'}} onChange={onChangeEvent} value={value} placeholder={hint}/>
                :
                <WelcomeInputBox type={type} onChange={onChangeEvent} value={value} placeholder={hint}/>
            }
        </>

  );
}

const WelcomeInputBox = Styled.input`
    margin-top: 6px;
    margin-bottom: 11px;
    font-size: 14px;
    border-radius: 5px;
    outline: none;
    border: 0;
    background-color: #ffffff;
    font-size: 15px;
    padding: 14px;
    width: calc(100% - 30px) !important;
    color: #252525;
`


export default WelcomeInput;
