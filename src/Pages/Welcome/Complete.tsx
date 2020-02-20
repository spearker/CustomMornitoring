
import React, { useEffect, useState, useContext, useCallback } from 'react';
import Styled, { withTheme } from 'styled-components'
import { BrowserRouter as Router, Redirect, Link} from 'react-router-dom';
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import Axios from 'axios';
import { read } from 'fs';

// 회원가입 정보 입력 페이지 (메일 인증 후 )

const Complete = () => {


  useEffect(()=>{
     
  },[])

  return (

    
    
        <FullPageDiv>
            <WelcomeNavigation position={'static'} />
            <InnerDiv >
              <p style={{fontSize:36, marginTop:108}}>Sign Up</p>
              <div style={{marginTop:34, marginBottom:320}}>
                <p style={{marginBottom:102}}>
                가입 정보를 인증중입니다. <br/>
                담당자 승인 후 로그인 할 수 있습니다.   <br/> <br/>

                잠시만 기다려주세요.
                </p>
                <div style={{width:327, backgroundColor:'red'}}>
                <Link to="/login" style={{ textAlign:'center', padding:15,  display:'block', fontSize:15, color:'black', backgroundColor:POINT_COLOR}}>돌아가기</Link>
            
                </div>
                
              </div>
            </InnerDiv>
            <WelcomeFooter/>
        </FullPageDiv>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  min-height: calc(100vh - 213px);
  hegith: 100%;
  text-align:center;
  background-color: ${BG_COLOR_SUB2}
`

const InnerDiv = Styled.div`
  display:inline-block;
  width: 327px;
  max-width: 327px;
  color: white;
  text-align:left;
 
`


export default Complete;