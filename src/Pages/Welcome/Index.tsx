import React, { useEffect } from 'react';
import Styled from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'


// 접속시 보이는 웰컴(스플래시) 페이지

const Welcome = () => {

  useEffect(()=>{
   
  },[])

  return (
    <FullPageDiv>
      <FullBodyDiv>
          <div>
            <p style={{fontSize: 60, margin: 0, marginTop:50, paddingBottom:28,  borderBottom: `2px solid ${POINT_COLOR}`}}>{SYSTEM_NAME}</p>
            <p style={{fontSize: 60, marginTop: 36}}>스마트 팩토리 생산 관리 시스템</p>
          </div>   
      </FullBodyDiv>
      <WelcomeNavigation position={'fixed'} />
    </FullPageDiv>
      
  );
}

const FullPageDiv = Styled.div`
  width: 100vw;
  height: 100vh;
`

const FullBodyDiv = Styled.div`
    height: 100vh;
    width: 100%;
    color: ${POINT_COLOR} ;
    background-color: ${BG_COLOR_SUB2};
    position:relative;
    text-align: center;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center; 
`

export default Welcome;