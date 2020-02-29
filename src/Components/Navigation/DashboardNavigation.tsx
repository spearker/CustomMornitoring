import React, { useEffect } from 'react';
import Styled from 'styled-components'
import { BrowserRouter, Route, Switch ,Link} from 'react-router-dom';
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import Icon from '../../Assets/Images/ic_nav_temp.png'
import NavList from './NavList'
import { useUserDispatch } from '../../Context/UserContext';
//대시보드 네비게이션
interface Props{
  select?: string
}


const DashboardNavigation = ({select}: Props) => {
  const dispatch = useUserDispatch();

  useEffect(()=>{

  },[])


  const MenuGroup1 = [
    { name : '메인페이지', icon: Icon, url : '/dashboard'},
    { name : '작업지시서 등록', icon: Icon,  url : '/register/work'},
    { name : '작업지시서 내역', icon: Icon,  url : '/list/work'},
    { name : '기계 및 장비 현황', icon: Icon,  url : '/register/work'},
  ]

  const MenuGroup2 = [
    { name : '직원 관리', icon: Icon, url : '/manage/member'},
    { name : '가입 승인 관리', icon: Icon, url : '/manage/accept'},
    { name : '자재 정보 등록', icon: Icon, url : '/register/material'},
    { name : '금형 정보 등록', icon: Icon,  url : '/register/design'},
    { name : '기계 정보 등록', icon: Icon,  url : '/register/machine'},
    { name : '주변장치 등록', icon: Icon,  url : '/register/sub'},
    { name : '라인 정보등록', icon: Icon,  url : '/register/line'},
  ]

  const MenuGroup3 = [
    { name : '자재 정보 리스트', icon: Icon, url : '/list/material'},
    { name : '금형 정보 리스트', icon: Icon,  url : '/list/design'},
    { name : '기계 정보 리스트', icon: Icon,  url : '/list/machine'},
    { name : '주변장치 리스트', icon: Icon,  url : '/list/sub'},
    { name : '라인 정보리스트', icon: Icon,  url : '/list/line'},
  ]

  const MenuGroup4 = [
    { name : '통계', icon: Icon, url : '/charts'},
    { name : '레포트', icon: Icon, url : '/report'},
  
  ]


  return (
    
        <NavDiv>
            <div style={{textAlign:'center', marginBottom: 80 }}>
              <a href="/dashboard"><img src={Logo} style={{width: 125, marginBottom:8}}/></a>
              <p style={{fontSize:16}}>{SYSTEM_NAME}</p>
            </div>
            {
              MenuGroup1.map((value, index)=>{
                return(
                  <NavList key={`1-${index}`} name={value.name} icon={value.icon} url={value.url} select={ window.location.pathname === value.url }/>
                )
              })
            }
            <br/><br/><br/>
            {
              MenuGroup2.map((value, index)=>{
                return(
                  <NavList key={`2-${index}`} name={value.name} icon={value.icon} url={value.url} select={ window.location.pathname === value.url }/>
                )
              })
            }
             <br/><br/><br/>
            {
              MenuGroup3.map((value, index)=>{
                return(
                  <NavList key={`3-${index}`} name={value.name} icon={value.icon} url={value.url} select={ window.location.pathname === value.url }/>
                )
              })
            }
             <br/><br/><br/>
            {
              MenuGroup4.map((value, index)=>{
                return(
                  <NavList key={`4-${index}`} name={value.name} icon={value.icon} url={value.url} select={ window.location.pathname === value.url }/>
                )
              })
            }
           
        </NavDiv>
      
  );
}


const NavDiv = Styled.div`
  padding: 80px 40px 40px 40px;
  background-color: ${BG_COLOR};
  heigth: 100%;
  width: 200px;
  min-height: 100vh;
  display: inline-block;
  color: white;
  
  
`


export default DashboardNavigation;