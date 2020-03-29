import React, { useEffect,useState } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import TinyButton from '../Button/TinyButton';


interface IProps{
    contents: string[],
    select: number,
    onClickEvent: any,
}
const BasicToggle = ({contents, select, onClickEvent}: IProps) => {       

  useEffect(()=>{
   
  },[])

  return (
    <div style={{display:'inline-block', backgroundColor:'#e7e9eb', borderRadius:5}}>
        {
          contents.map((v, i)=>{
            return(
              <ButtonBox type="button" onClick={()=>onClickEvent(i)} style={{backgroundColor: i === select ? POINT_COLOR : '#e7e9eb'}} >{v}</ButtonBox>
          )})
          
        }
    </div>
      
  );
}


const ButtonBox = Styled.button`
    padding: 2px 18px 3px 18px;
    color: black;
    display: inline-block;
    background-color: #ebebeb;
    border-radius: 5px;
    font-size: 14px;

`



export default BasicToggle;