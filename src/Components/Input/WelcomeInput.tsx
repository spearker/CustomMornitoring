import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import { useTranslation } from 'react-i18next';

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    hint: string,
    type: string,
    value: number | string,
    onChangeEvent?: (e: React.ChangeEvent<HTMLInputElement>) =>void
}
const WelcomeInput = ({title, hint, type, value, onChangeEvent}: IProps) => {

  useEffect(()=>{
   
  },[])

  return (
    
        <>
            <label className="p-eng" style={{fontSize: 14}}>{title}</label>
            {
                type === 'password' ? 
                <WelcomeInputBox type={type} onChange={onChangeEvent} value={value} placeholder={hint}/>
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