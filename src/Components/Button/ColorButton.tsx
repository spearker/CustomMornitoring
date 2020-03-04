import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import { Link } from 'react-router-dom';

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
  url: string,
  children: any,
  //onClickEvent?: ()=>void,
}
const ColorButton = ({url,children}: IProps) => {

  const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
  `

  return (
    <ButtonWrap >
      <Link to={url}>
        <div style={{display:'flex', alignItems:'center'}}>
          {children}
        </div>
      </Link>
    </ButtonWrap>
  );
}




export default ColorButton;