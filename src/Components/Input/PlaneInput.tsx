import React, { useEffect,useRef, useState } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';
import Calendar from 'react-calendar'
import moment from 'moment';
import useOnclickOutside from 'react-cool-onclickoutside';

//아래에 선이 없는 input

interface IProps{
    fontSize: string,
    description: string,
    value: string,
    onChangeEvent: any,
}
const PlaneInput = ({fontSize, description, value, onChangeEvent}: IProps) => {


  useEffect(()=>{
   
  },[])



  return ( 
        <InputWrapDiv style={{fontSize:fontSize}}>
            <input type="text" style={{fontSize:fontSize}} value={value} placeholder={description} onChange={ (e: React.ChangeEvent<HTMLInputElement>): void =>{onChangeEvent(e.target.value)}}  />
        </InputWrapDiv>
  );
}



const InputWrapDiv = Styled.div`
border: 0;
width: 100%;
background-color: transparent;
input{
    padding-left: 4px;
    border:0;
    margin-top: 11px;
    margin-bottom: 11px;
    width: 70%;
    background-color: transparent;
}
`

export default PlaneInput;