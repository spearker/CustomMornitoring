import React from 'react'
import Styled from 'styled-components'
import {Link} from 'react-router-dom'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps {
  name: string,
  width?: string,
  to?: string,
  color?: string,
  style?: object,
  onClick?: () => void
}

const BasicGrayButtonLink = ({name, width, to, color, style, onClick}: IProps) => {

  const ButtonWrap = Styled.button`
    padding: ${to ? '12px' : '3px'};
    border-radius: 5px;
    click-event: none;
    color: black;
    background-color: ${color ? color : '#e7e9eb'};
    border: none;
    width: ${width};
    font-size: 18px;
    font-weight: bold;
    ${style && style.toString()}
  `

  return (
    to ?
      <Link to={to}>
        <ButtonWrap>{name}</ButtonWrap>
      </Link>
      :
      <ButtonWrap onClick={onClick}>{name}</ButtonWrap>
  )
}


export default BasicGrayButtonLink
