import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import Icon from '../../Assets/Images/ic_nav_temp.png'


//대시보드 네비게이션
interface Props{
  no?: string, //메뉴 고유 넘버
  select?: boolean, // 버튼 선택여부 
  url: string, //링크 url
  name: string,
  icon: string, //아이콘 url
}


const NavList = ({no, select, url, name, icon}: Props) => {

  useEffect(()=>{
   
  },[])

  return (
      <>
      {
        select ?
          <ListDivSelected>
            <img src={icon} style={{width: 20}} />
            <a href={url} style={{marginLeft: 13}}>{name}</a>
          </ListDivSelected>
          :
          <ListDiv>
            <img src={icon} style={{width: 20}} />
            <a href={url} style={{marginLeft: 13}}>{name}</a>
          </ListDiv>
      }
      </>

      
  );
}




const ListDiv = Styled.div`
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid grey;
  text-align: left;
  font-size: 18px;
  color: white;
  cursor: pointer;
`

const ListDivSelected = Styled.div`
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid grey;
  text-align: left;
  font-size: 18px;
  font-weight: 600;
  color: ${POINT_COLOR};
  cursor: pointer;
`


export default NavList;