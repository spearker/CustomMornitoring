import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import Icon from '../../Assets/Images/ic_nav_temp.png'
import { Link } from 'react-router-dom';


//대시보드 네비게이션 리스트
interface Props{
  no?: string, //메뉴 고유 넘버
  select?: boolean, // 버튼 선택여부 
  url: string, //링크 url
  name: string,
}


const SubNavList = ({no, select, url, name}: Props) => {

  useEffect(()=>{
   
  },[])

  return (
      <>
      {
        select ?
          <ListDivSelected>
            <Link to={url} >{name}</Link>
          </ListDivSelected>
          :
          <ListDiv>
            <Link to={url} >{name}</Link>
          </ListDiv>
      }
      </>

      
  );
}




const ListDiv = Styled.div`
  padding: 11px 19px 11px 19px;
  border-bottom: 2px solid #717c90;
  text-align: center;
  font-size: 18px;
  color: #717c90;
  display: inline-block;
  margin-right: 20px;
  font-weight: normal;
  cursor: pointer;
`

const ListDivSelected = Styled.div`
  padding: 10px 19px 10px 19px;
  border-bottom: 2px solid ${POINT_COLOR};
  text-align: center;
  font-size: 18px;
  display: inline-block;
  font-weight: bold;
  margin-right: 20px;
  color: ${POINT_COLOR};
  cursor: pointer;
`


export default SubNavList;