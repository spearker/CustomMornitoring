import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import IMG_COMMING from '../../Assets/Images/img_commingsoon.svg';
import 'react-dropdown/style.css'
import styled from 'styled-components';
import { POINT_COLOR } from '../../Common/configset';



const CommingSoon = () => {

  
 
 

  useEffect(()=>{
    //getList()
   
  },[])


  return (
      <DashboardWrapContainer index={999}>
        <Wrapper>
         
          <p className="p-eng">COMMING SOON</p>
          <p>서비스 준비중 입니다</p>
          
        </Wrapper>
      </DashboardWrapContainer>
      
  );
}

const Wrapper = styled.div`
  color: #ffffff97;
  padding-top: 128px;
  
  p{
    font-size: 16px;
    margin-right: 32px;
    &:first-child{
      font-size: 32px;
      color: ${POINT_COLOR};
      margin-bottom: 7px;
    }
    
  }
  img{
    width: 20px;
  }
`

export default CommingSoon;