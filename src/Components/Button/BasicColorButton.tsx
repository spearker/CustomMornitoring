import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    name: string,
    width?: string,
    onClickEvent?: ()=>void,
}
const BasicColorButton = ({name, width, onClickEvent}: IProps) => {

  const ButtonWrap = Styled.button`
    padding: 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    width: ${width};
    font-size: 18px;
  `

  return (
    <ButtonWrap onClick={onClickEvent}>{name}</ButtonWrap>
  );
}




export default BasicColorButton;