import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SERVICE_TITLE, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { Link } from 'react-router-dom';

//웰컴, 로그인 페이지 네비게이션 컴포넌트

const WelcomeNavigation = () => {

  useEffect(()=>{
   
  },[])

  return (
    <NavInnerDiv >
        <Link to="/"><p className="p-eng">{SERVICE_TITLE}</p></Link>   
    </NavInnerDiv>
  );
}

const NavInnerDiv = Styled.div`ß
  text-align: left;
  font-size: 20px;
  color: white;
  position: absolute;
  z-index: 999;
  padding-top: 29px;
  padding-bottom: 30px;
  margin-left: 60px;
`


export default WelcomeNavigation;