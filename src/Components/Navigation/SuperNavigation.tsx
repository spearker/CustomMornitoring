import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps {
  position: string
}
const SuperNavigation = ({position}: IProps) => {

  const mPosition = position;
  //console.log(mPosition)

    const FullWidthDiv = Styled.div`
      width: 100%;
      color: ${POINT_COLOR};
      top: 0;
      position: ${mPosition};
      text-align: center;
      background-color: ${BG_COLOR}

    `
  useEffect(()=>{
   
  },[])

  return (
    
        <FullWidthDiv>
            <NavInnerDiv >
                <a href="/">슈퍼어드민</a>
                <a href="/super/register" style={{float: 'right'}}>회사등록</a>
                <a href="/super/list" style={{float: 'right', marginRight:26}}>회사조회</a>       
            </NavInnerDiv>
        </FullWidthDiv>
      
  );
}


const NavInnerDiv = Styled.div`
  display: inline-block;
  text-align: left;
  font-size: 24px;
  color: ${POINT_COLOR};
  padding-top: 30px;
  padding-bottom: 30px;
  width: ${MAX_WIDTH};
`


export default SuperNavigation;