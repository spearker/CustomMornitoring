import React from 'react';
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import {Link} from 'react-router-dom';

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
