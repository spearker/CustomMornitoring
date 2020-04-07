import React, { useEffect ,useState,useRef} from 'react';
import Styled from 'styled-components'
import { BrowserRouter, Route, Switch ,Link} from 'react-router-dom';
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, SERVICE_TITLE} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import Icon from '../../Assets/Images/btn_menu_2.png'
import NavList from './NavList'
import { useUserDispatch, useUser } from '../../Context/UserContext';
import useOnclickOutside from 'react-cool-onclickoutside';
import NavGroupList from '../List/NavGroupList';
//대시보드 네비게이션
interface Props{
  select?: string
}


const DashboardNavigation = ({select}: Props) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useUserDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected]= useState<number>(999);
  const me = useUser()
  useOnclickOutside(ref,() => {
    setIsOpen(false);
}
);

  useEffect(()=>{

  },[])

 

  const menuList = [
    [ //1 기준 정보 관리
      { name : '기준 정보 관리', url : '/list/machine'},
      { name : '기계 기본정보', url : '/list/machine'},
      { name : '주변장치 기본정보', url : '/list/submachine'},
      { name : '금형 기본정보', url : '/list/design'},
      { name : '자재 기본정보', url : '/list/material'},
      { name : '바코드 기본정보', url : '/list/barcode'},
      { name : '인사 기본정보', url : '/list/pr'},
      { name : '거래처 기본정보', url : '/list/clients'}
    ],
    [ //2 인사 관리
      { name : '인사 관리', url : '/manage/teams'},
      { name : '부서조직관리', url : '/manage/teams'},
      { name : '직급 관리', url : '/manage/rank'},
      { name : '직원 관리', url : '/manage/members'},
      { name : '가입 승인 관리', url : '/manage/accept'},
    ],
    [ //3 거래처 관리
      { name : '거래처 관리', url : '/client/list'},
      { name : '거래처 관리', url : '/client/list'},
      { name : '매입 관리', url : '/client/buy'},
      { name : '매출 관리', url : '/client/sell'},
    ],
    [ //4 외주 관리
      { name : '외주 관리', url : '/subcontractor/list'},
      { name : '외주처 관리', url : '/subcontractor/list'},
      { name : '발주 관리', url : '/subcontractor/order'},
      { name : '수주 관리', url : '/subcontractor/contract'},
    ],
    [ //5 바코드 관리
      { name : '바코드 관리', url : '/barcode/register'},
      { name : '바코드 등록', url : '/barcode/register'},
      { name : '바코드 수정/삭제', url : '/barcode/register'},
      { name : '바코드 리스트', url : '/barcode/list'},
      { name : '바코드 검색', url : '/barcode/search'},
    ],
    [ //6 보전 관리
      { name : '보전관리', url : '/maintenance/machine/register'},
      { name : '기계 보전등록', url : '/maintenance/machine/register'},
      { name : '기계 보전리스트', url : '/maintenance/machine/list'},
      { name : '주변장치 보전등록', url : '/maintenance/submachine/register'},
      { name : '주변장치 보전리스트', url : '/maintenance/submachine/list'},
      { name : '금형 보전등록', url : '/maintenance/design/register'},
      { name : '금형 보전리스트', url : '/maintenance/design/list'},
      { name : '보전 검색', url : '/maintenance/search'},
      { name : '보전 이력관리', url : '/maintenance/list'},
    ],
    [ //7 공정 관리
      { name : '공정 관리', url : '/process/list'},
      { name : '공정 등록', url : '/process/register'},
      { name : '공정 리스트', url : '/process/list'},
      { name : '공정 검색', url : '/process/search'},
      { name : '프레스 공정 추천 분석', url : '/process/recommend/press'},
    ],
    [ //8 재고 관리
      { name : '재고 관리', url : '/maintenance/stock/list'},
      { name : '재고 관리', url : '/maintenance/stock/list'},
      { name : '생산 관리', url : '/maintenance/stock/'},
      { name : '입고 관리', url : '/maintenance/stock/in'},
      { name : '출고 관리', url : '/maintenance/stock/out'},
    ],
    [ //9 불량 관리
      { name : '품질 관리', url : '/defective/register'},
      { name : '불량 자재 등록', url : '/defective/register'},
      { name : '불량 자재 리스트', url : '/defective/list'},
    ],

  ];
  
  const MenuGroup1 = [
    { name : '기계기본정보', url : '/machine/list'},
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
                menuList.map((v, i)=>{
                    return(
                      <NavGroupList 
                      onClickEvent={()=>{
                        if(isSelected === i){
                          setIsSelected(999)
                        }else{
                          setIsSelected(i)
                        }
                      }}
                      selected={isSelected === i ? true : false} contents={v}/>
                    )
                })
              }
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