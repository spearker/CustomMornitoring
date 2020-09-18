import React from 'react';
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    name: string,
    width?: string,
    onClickEvent?: any,
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
    &:button {
      transition-duration: 0.4s;
    }
    &:hover {
      transform: scale(0.97);
      background-color: ${POINT_COLOR};
    }
    &:active {
      
      transform: scale(0.97);
    }
    
  `


  return (
    <ButtonWrap onClick={onClickEvent}>{name}</ButtonWrap>
  );
}




export default BasicColorButton;
