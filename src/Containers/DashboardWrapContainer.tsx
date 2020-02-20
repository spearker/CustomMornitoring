import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import DashboardNavigation from '../Components/Navigation/DashboardNavigation'
import Footer from '../Components/Footer/WelcomeFooter';
import SearchBar from '../Components/Navigation/SearchBar';

//대시보드를 감싸는 wrap 박스 

const DashboardWrapContainer = ({children}: any) => {
  useEffect(()=>{
   
  },[])

  return (
    <>
    <DashboardWrapDiv >
      <DashboardNavigation/>

      <div style={{width: '100%', textAlign:'center'}}>
       <SearchBar />
        <div style={{width: 1100, display:'inline-block'}}>
          {children}
        </div>
      
      </div>
     
    </DashboardWrapDiv>
    
    </>
      
  );
}

const DashboardWrapDiv = Styled.div`

    display: flex;
    width: 100%;
    min-width: 1440px;
    background-color: ${BG_COLOR_SUB2};
    border-bottom: 1px solid gray

`

/*
const DashboardNavigation = Styled.div`
    padding: 15px;
    width: 100%;
    color: black;
    background-color: ${POINT_COLOR};
    border: 0;
    font-size: 18px;

`

const DashboardTop = Styled.div`
    padding: 15px;
    width: 100%;
    color: black;
    background-color: ${POINT_COLOR};
    border: 0;
    font-size: 18px;

`
*/
export default DashboardWrapContainer;