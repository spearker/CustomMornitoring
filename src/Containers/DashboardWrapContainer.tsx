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
  const loadUserInfo = async () => {

    const results = await getRequest(BASE_URL + '/api/v1/user/load', getToken(TOKEN_NAME))

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
        dispatch({
          type: 'SET_USER',
          data: {
            pk: results.results.pk,
            email: results.results.email,
            is_admin: results.results.is_admin,
            appointment: results.results.appointment,
            name: results.results.name,
            profile_img : results.results.profile_img,
            is_login : true,
          }
        });
      }else{
        //TODO : 지울것
        alert('세션 체크 실패 : 테스트 기간동안은 임시로 비로그인 접속 허용')
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

      <div style={{width: '100%', marginBottom:88, textAlign:'center'}}>
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
    min-height: 100vh;
    heigth: 100%;
    min-width: 1440px;
    background-color: ${BG_COLOR_SUB2};
`

export default DashboardWrapContainer;