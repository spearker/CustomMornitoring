import React, { useEffect } from 'react';
import Styled from 'styled-components'
import { BrowserRouter, Route, Switch ,Link} from 'react-router-dom';
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, SERVICE_TITLE} from '../../Common/configset'
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
    { name : '메인페이지', url : '/dashboard'},
    { name : '작업지시서 등록', url : '/register/work'},
    { name : '작업지시서 내역', url : '/list/work'},
    { name : '기계 및 장비 현황', url : '/register/work'},
    { name : '모니터링', url : '/monitoring'},
    { name : '마이페이지', url : '/my'},
  ]

  const MenuGroup2 = [
    { name : '인사 관리', url : '/manage/members'},
    { name : '가입 승인 관리', url : '/manage/accept'},
    { name : '자재 정보 등록', url : '/register/material'},
    { name : '금형 정보 등록', url : '/register/design'},
    { name : '기계 정보 등록', url : '/register/machine'},
    { name : '주변장치 등록', url : '/register/sub'},
    { name : '라인 정보등록', url : '/register/line'},
  ]

  const MenuGroup3 = [
    { name : '자재 정보 리스트', url : '/list/material'},
    { name : '금형 정보 리스트', url : '/list/design'},
    { name : '기계 정보 리스트', url : '/list/machine'},
    { name : '주변장치 리스트', url : '/list/sub'},
    { name : '라인 정보리스트', url : '/list/line'},
  ]

  const MenuGroup4 = [
    { name : '통계', url : '/charts'},
    { name : '레포트', url : '/report'},
    { name : '서비스 문의', url : '/report'},
  
  ]


  return (
    
        <NavDiv>
            <div style={{textAlign:'center', width:'100%', marginBottom: 80, }}>
              <a href="/dashboard"><img src={Logo} style={{width: 100, marginBottom:8}}/></a>
              <p className="p-bold" style={{display:'inline-block',fontSize:16,textAlign:'center', color:`${POINT_COLOR}`}}>{SERVICE_TITLE}</p>
            </div>
            <div style={{paddingLeft:35}}>
            {
              MenuGroup1.map((value, index)=>{
                return(
                  <NavList key={`1-${index}`} name={value.name} url={value.url} select={ window.location.pathname === value.url }/>
                )
              })
            }
            <br/><br/><br/>
            {
              MenuGroup2.map((value, index)=>{
                return(
                  <NavList key={`2-${index}`} name={value.name}  url={value.url} select={ window.location.pathname === value.url }/>
                )
              })
            }
             <br/><br/><br/>
            {
              MenuGroup3.map((value, index)=>{
                return(
                  <NavList key={`3-${index}`} name={value.name} url={value.url} select={ window.location.pathname === value.url }/>
                )
              })
            }
             <br/><br/><br/>
            {
              MenuGroup4.map((value, index)=>{
                return(
                  <NavList key={`4-${index}`} name={value.name} url={value.url} select={ window.location.pathname === value.url }/>
                )
              })
            }
           </div>
        </NavDiv>
      
  );
}


const NavDiv = Styled.div`
  background-color: ${BG_COLOR};
  heigth: 100%;
  width: 275px;
  min-height: 100vh;
  display: inline-block;
  color: white;
  padding-top: 40px;
  padding-bottom: 40px;

`


export default DashboardNavigation;