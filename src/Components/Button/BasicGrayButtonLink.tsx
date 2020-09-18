import React from 'react';
import Styled from 'styled-components'
import {Link} from 'react-router-dom';

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    name: string,
    width?: string,
    to: string,
}
const BasicGrayButtonLink = ({name, width, to}: IProps) => {

  const ButtonWrap = Styled.button`
    padding: 12px;
    border-radius: 5px;
    click-event: none;
    color: black;
    background-color: #e7e9eb;
    border: none;
    width: ${width};
    font-size: 18px;
    font-weight: bold;
  `

  return (
    <Link to={to}>
      <ButtonWrap>{name}</ButtonWrap>
    </Link>
  );
}




export default BasicGrayButtonLink;
