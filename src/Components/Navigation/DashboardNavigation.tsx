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
    { name : '작업지시서 등록', url : '/task/register'},
    { name : '작업지시서 내역', url : '/task/list'},
    { name : '기계 및 장비 현황', url : '/status'},
    { name : '모니터링', url : '/monitoring/press'},
    { name : '마이페이지', url : '/mypage'},
  ]

  const MenuGroup4 = [
    { name : '통계', url : '/charts'},
    { name : '레포트', url : '/report'},
    { name : '서비스 문의', url : '/report'},
  
  ]


  return (
    
        <NavDiv>
            <div style={{textAlign:'center', width:'100%', marginBottom: 44, }}>
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
             <br/><br/>
            <NavList name={'인사 관리'}  url={'/manage/setting'} select={ window.location.pathname.includes('/manage/') }/>
            <NavList name={'정보 등록'}  url={'/register/material'} select={ window.location.pathname.includes('/register/') }/>
            <NavList name={'정보 리스트'}  url={'/list/material'} select={ window.location.pathname.includes('/list/') }/>
            <NavList name={'재고 관리'}  url={'/stock/material'} select={ window.location.pathname.includes('/stock/') }/>
            <NavList name={'통계'}  url={'/charts'} select={ window.location.pathname ==='/charts' }/>
            <NavList name={'레포트'}  url={'/reports'} select={ window.location.pathname === '/reports' }/>
            <br/><br/>
            <NavList name={'서비스 문의'}  url={'/service'} select={ window.location.pathname === '/service' }/>
            <p style={{fontSize:11, marginTop:10, marginBottom:60, color: '#ffffff90'}}>2020 SIZL. All Rights Reserved.</p>
           </div>
        </NavDiv>
      
  );
}


const NavDiv = Styled.div`
  background-color: ${BG_COLOR};
  heigth: 100%;
  width: 275px;
  min-height: 100vh;
  min-height: 100vh;
  display: inline-block;
  color: white;
  padding-top: 40px;
  padding-bottom: 40px;

`


export default DashboardNavigation;