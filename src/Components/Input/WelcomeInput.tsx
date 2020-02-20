import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    description: string,
    type: string,
    value: number | string,
}
const WelcomeInput = ({title, description, type, value}: IProps) => {
  useEffect(()=>{
   
  },[])

  return (
    
        <div>
            <label style={{fontSize: 10, marginBottom:8}}>{title}</label>
            <WelcomeInputBox type={type} value={value} placeholder={description}/>
        </div>
      
  );
}

const WelcomeInputBox = Styled.input`
    border: solid 1px #525252;
    font-size: 14px;
    background-color: transperate;

`

const InnerDiv = Styled.div`
  display: inline-block;
  text-align: left;
  font-size: 12px;
  color: white;
  line-height: 1.67;
  padding-top: 35px;
  padding-bottom: 35px;
  width: ${MAX_WIDTH};
`


export default WelcomeInput;