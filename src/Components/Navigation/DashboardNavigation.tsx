import React, { useEffect ,useState,useRef} from 'react';
import Styled from 'styled-components'
import { BrowserRouter, Route, Switch ,Link} from 'react-router-dom';
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, SERVICE_TITLE} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import Icon from '../../Assets/Images/btn_menu_2.png'
import NavList from './NavList'
import { useUserDispatch, useUser } from '../../Context/UserContext';
import useOnclickOutside from 'react-cool-onclickoutside';
//대시보드 네비게이션
interface Props{
  select?: string
}


const DashboardNavigation = ({select}: Props) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useUserDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const me = useUser()
  useOnclickOutside(ref,() => {
    setIsOpen(false);
}
);

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
        <>
        <TabletIconDiv>
          <a onClick={()=>{setIsOpen(!isOpen)}}><img src={Icon} style={{width: 32}}/></a>
        </TabletIconDiv>
        <NavDiv>
            <div style={{textAlign:'center', width:'100%', marginBottom: 44, }}>
              <a href="/dashboard"><img src={Logo} style={{width: 100, marginBottom:8}}/></a><br/>
              <p className="p-bold" style={{minWidth:100, display:'inline-block',fontSize:18,textAlign:'center', color:`${POINT_COLOR}`}}>{me.company_name === undefined ? SERVICE_TITLE : me.company_name}</p>
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
            <p style={{fontSize:11, marginTop:10, marginBottom:60, color: '#ffffff90'}}>Copyright© 2020 SIZL corp <br/> All Rights Reserved.</p>
           </div>
        </NavDiv>
        {
          isOpen ?
        <NavDivFixedTop ref={ref}>
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
            <p style={{fontSize:11, marginTop:10, marginBottom:60, color: '#ffffff90'}}>Copyright© 2020 SIZL corp <br/> All Rights Reserved.</p>
           </div>
        </NavDivFixedTop>
        :
        null}
        </>
      
  );
}


const NavDiv = Styled.div`
  background-color: ${BG_COLOR};
  heigth: 100%;
  min-width: 240px;
  min-height: 100vh;
  display: inline-block;
  color: white;
  padding-top: 40px;
  padding-bottom: 40px;
  @media screen and (max-width: 1284px) { 
    display: none;
  } 
`

const TabletIconDiv = Styled.div`
  heigth: 60px;
  width: 60px;
  position: absolute;
  top: 22px;
  left: 50px;
  @media screen and (min-width: 1284px) { 
    display: none;
  } 
  @media screen and (max-width: 1240px) { 
    left: 60px;
  }
  @media (min-width: 1240px) and (max-width: 1284px) { 
    left: 90px;
  } 
`
const NavDivFixedTop = Styled.div`
  background-color: ${BG_COLOR};
  heigth: 100%;
  min-height: 100vh;
  overflow: scroll;
  min-width: 240px;
  display: inline-block;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  padding-top: 40px;
  padding-bottom: 600px;
`
export default DashboardNavigation;