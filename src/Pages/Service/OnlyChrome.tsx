import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import IMG from '../../Assets/Images/lion.png';
import { getRequest } from '../../Common/requestFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import SubHeader from '../../Components/Text/SubHeader';

// 인터넷 익스플로러 차단
const OnlyChrome = () => {


  useEffect(()=>{


  },[])

  return (
      <FullWrapDiv>
        <img src={IMG} style={{width:120, marginTop:120, marginBottom:20}} />

        <p style={{fontSize:19}}>
          현재 사용하고 있는 브라우저의 버전이 낮아, <br/>
          웹 페이지를 표시 할 수 없습니다.<br/>
        </p>
        <p style={{fontSize:16, marginTop:22}}>쾌적한 서비스 사용을 위해
           <span><a href="https://www.google.com/intl/ko/chrome/" target="_blank" style={{textDecoration:'underline', color:'#586AF2', paddingLeft:6}}>크롬 브라우저</a></span>
           로 접속해주세요.

        </p>
        <p style={{fontSize:13, marginTop:66, color:'gray'}}>최신버전의 크롬(Chrome), 사파리(Safari), 파이어폭스(FireFox) 브라우저에서 이용 가능합니다.
        </p>

        <p style={{fontSize:13, marginTop:10,  color:'gray'}}>Copyright© 2020 Zestech.
All Rights Reserved.</p>
      </FullWrapDiv>

  );
}

const FullWrapDiv = Styled.div`
  text-align: center;

  color: #252525;
  width: 100vw;
  height: 100vh;
  background-color: #F0F1F3;
`
export default OnlyChrome;
