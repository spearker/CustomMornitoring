import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH, BASE_URL} from '../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import DashboardNavigation from '../Components/Navigation/DashboardNavigation'
import Footer from '../Components/Footer/WelcomeFooter';
import SearchBar from '../Components/Navigation/SearchBar';
import Axios from 'axios';
import { getToken } from '../Common/getToken';
import { useUserDispatch } from '../Context/UserContext';

//대시보드를 감싸는 wrap 박스 

const DashboardWrapContainer = ({children}: any) => {

  const dispatch = useUserDispatch();
  
  useEffect(()=>{
    Axios.get('/api/v1/user/load', { 'headers': { 'Authorization': getToken() }})
    .then(function (res: IServerResponse) {
      if(res.data.status === 200){

        const data = res.data.results
        dispatch({
          type: 'SET_USER',
          data: {
            pk: data.pk,
            email: data.email,
            is_admin: data.is_admin,
            appointment: data.appointment,
            name: data.name,
            profile_img : data.profile_img,
            is_login : true,
          }
        });
      }else {
        //alert('세션이 만료되었습니다. 잘못된 접근입니다.')
        //window.location.href= "/login" 
      }
    })
    .catch(function (error) {
      console.log(error);
      //alert('세션이 만료되었습니다. 잘못된 접근입니다.')
      //window.location.href= "/login" 
     
    });
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