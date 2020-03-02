import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, BASE_URL, TOKEN_NAME} from '../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import DashboardNavigation from '../Components/Navigation/DashboardNavigation'
import Footer from '../Components/Footer/WelcomeFooter';
import ProfileBar from '../Components/Navigation/ProfileBar';
import Axios from 'axios';
import { getToken } from '../Common/tokenFunctions';
import { useUserDispatch } from '../Context/UserContext';
import { getRequest } from '../Common/requestFunctions';

//대시보드를 감싸는 wrap 박스 

const DashboardWrapContainer = ({children}: any) => {

  const dispatch = useUserDispatch();

  /**
   * loadUserInfo()
   * : 유저 정보 로드 후 user info dispatch
   * @returns X
   */
  const loadUserInfo = () => {

    const results = getRequest(BASE_URL + '/api/v1/user/load', getToken(TOKEN_NAME))

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
        dispatch({
          type: 'SET_USER',
          data: {
            pk: results.data.pk,
            email: results.data.email,
            is_admin: results.data.is_admin,
            appointment: results.data.appointment,
            name: results.data.name,
            profile_img : results.data.profile_img,
            is_login : true,
          }
        });
      }else{

      }
    }
  }
  
  useEffect(()=>{

    loadUserInfo();
    
  },[])

  return (
    <>
    <DashboardWrapDiv >
      <DashboardNavigation/>

      <div style={{width: '100%', textAlign:'center'}}>
       <ProfileBar />
       
          {children}
   
      
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

export default DashboardWrapContainer;