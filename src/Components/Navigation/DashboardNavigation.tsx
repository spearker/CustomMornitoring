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
import { ROUTER_MENU_LIST } from '../../Common/routerset';
//대시보드 네비게이션
interface Props{
  select?: any
}


const DashboardNavigation = ({select}: Props) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useUserDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected]= useState<number>(999 );
  const me = useUser()
  useOnclickOutside(ref,() => {
    setIsOpen(false);
}
);

  useEffect(()=>{

  },[])

 

  


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
                ROUTER_MENU_LIST.map((v, i)=>{
                    return(
                      <NavGroupList 
                      key={`nav-${i}`}
                      onClickEvent={()=>{
                        if(isSelected === i){
                          setIsSelected(999)
                        }else{
                          setIsSelected(i)
                        }
                      }}
                      selected={isSelected === i ||  select === i? true : false} contents={v}/>
                    )
                })

              }
              <p style={{fontSize:12, color:'gray', paddingBottom:120, paddingTop:30}}>
              Copyright© 2020 SIZL corp <br/>
            All Rights Reserved.
                  </p>
            </div>
  
        </NavDiv>
        {
          isOpen ?
        <NavDivFixedTop ref={ref}>
            <div style={{paddingLeft:35}}>         
            {
                ROUTER_MENU_LIST.map((v, i)=>{
                    return(
                      <NavGroupList 
                      onClickEvent={()=>{
                        if(isSelected === i){
                          setIsSelected(999)
                        }else{
                          setIsSelected(i)
                        }
                      }}
                      selected={
                        isSelected === i  ? true : false
                      } contents={v}/>
                    )
                })
              }
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