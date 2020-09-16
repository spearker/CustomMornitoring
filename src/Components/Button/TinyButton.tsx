import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//작은 버튼 + 그레이 컬러

interface IProps{
    name: string,
    onClickEvent?: any,

}
const TinyButton = ({name, onClickEvent}: IProps) => {
  useEffect(()=>{
   
  },[])

  return (
   
       <ButtonBox type="submit" onClick={onClickEvent}>{name}</ButtonBox>

      
  );
}

const ButtonBox = Styled.button`
    padding: 2px 4px 2px 4px;
    color: black;
    display: inline-block;
    background-color: #ebebeb;
    border: 0;
    border: solid 0.5px #dfdfdf;
    font-size: 12px;
`


export default TinyButton;
