import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, BASE_URL, TOKEN_NAME} from '../Common/configset'
import DashboardNavigation from '../Components/Navigation/DashboardNavigation'
import ProfileBar from '../Components/Navigation/ProfileBar';
import { getToken, setToken, loadXHR } from '../Common/tokenFunctions';
import { useUserDispatch, useUser } from '../Context/UserContext';
import { getRequest } from '../Common/requestFunctions';
import { PM_MENU_LIST } from '../Common/routerset';

//대시보드를 감싸는 wrap 박스

const DashboardWrapContainer = ({children, index}: any) => {

  const dispatch = useUserDispatch();
  const User = useUser();
  /**
   * loadUserInfo()
   * : 유저 정보 로드 후 user info dispatch
   * @returns X
   */
  const loadUserInfo = async () => {
    if(User.pk !== ""){
      return;
    }
    const results = await getRequest('http://211.208.115.66:8299/api/v1/user/load', getToken(TOKEN_NAME))

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
            company_name: results.results.company_name,
          }
        });

        loadXHR(results.results.profile_img).then(function(blob) {
          setToken('sizl_photo', blob)
         })
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
      <DashboardNavigation select={index}/>
      <div style={{width: '100%', marginBottom:88, textAlign:'center'}}>
        <ProfileBar title={Object.keys(PM_MENU_LIST).find(f => f == index) ? 'PM System' : 'MES System'} />
       <div style={{minWidth: 1100}}>
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
    min-height: 100vh;
    heigth: 100%;
    min-width: 1180px;
    background-color: ${BG_COLOR_SUB2};
`

export default DashboardWrapContainer;
