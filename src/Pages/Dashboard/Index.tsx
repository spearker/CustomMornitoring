import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';


// 대시보드 메인 페이지
const Dashboard = () => {



  useEffect(()=>{

  },[])

  return (
      <DashboardWrapContainer>
        <FullPageDiv>
            <p>(컨텐츠 영역)</p>
        </FullPageDiv>
      </DashboardWrapContainer>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  padding-top:40px;
  background-color: ${BG_COLOR_SUB2}
`


export default Dashboard;