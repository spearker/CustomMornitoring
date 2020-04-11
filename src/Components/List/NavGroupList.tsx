import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import Icon from '../../Assets/Images/ic_nav_temp.png'
import { Link } from 'react-router-dom';


//대시보드 네비게이션 리스트
interface Props{
  contents: {name:string, url:string}[]
  selected: boolean
  onClickEvent: any
}


 const NavGroupList= ({contents, selected, onClickEvent}: Props) => {

  useEffect(()=>{
   
  },[])

  return (
      <>
       <ListDiv>
            <a onClick={onClickEvent}>{contents[0].name}</a>
      </ListDiv>
      {
        selected ?
          contents.map((v, i)=>{
              if(i === 0){
                return
              }else{
                return(
                  <ListInnderDiv key={`list-${i}`}>
                    <Link to={v.url} >· {v.name}</Link>
                  </ListInnderDiv>
  
                )
              }
          })
        :
        null
      

      }
      
    
      </>

      
  );
}


const ListInnderDiv = Styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  padding-left: 9px;
  font-size: 17px;
  color: white;
  cursor: pointer;
`


const ListDiv = Styled.div`
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid grey;
  text-align: left;
  font-size: 18px;
  color: white;
  cursor: pointer;
  margin-top: 6px;
`

const ListDivSelected = Styled.div`
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid ${POINT_COLOR};
  text-align: left;
  font-size: 18px;
  font-weight: 600;
  color: ${POINT_COLOR};
  cursor: pointer;
`


export default NavGroupList;