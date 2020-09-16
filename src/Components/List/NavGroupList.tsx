import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR,POINT_COLOR_2, BG_COLOR_SUB, BG_COLOR_SUB3,SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import Icon from '../../Assets/Images/ic_nav_temp.png'
import { Link , useHistory} from 'react-router-dom';


//대시보드 네비게이션 리스트
interface Props{
  contents: {name:string, url:string}[]
  selected: boolean
  onClickEvent: any
  onClickMode?: any
}


 const NavGroupList= ({contents, selected, onClickMode, onClickEvent}: Props) => {

  const history = useHistory();
  useEffect(()=>{
   
  },[])

  return (
      <div >
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
                  <ListInnderDiv key={`list-${i}`} onClick={onClickMode}>
                    <p onClick={()=>{window.scrollTo(0,0);history.push(v.url);}}  ><span>· </span>{v.name}</p>
                  </ListInnderDiv>
  
                )
              }
          })
        :
        null
      

      }
      
    
      </div>

      
  );
}


const ListInnderDiv = Styled.div`
  text-align: left;
  font-size: 16px;
  color: white;
  p, a{
    display: block;
    margin-left: 34px;
    padding-top: 13px;
    padding-bottom: 11px;
  }
  &:hover{
    background-color: ${BG_COLOR_SUB3}60;
  }
  span{
    color: #cccccc;
    font-weight: bold;
  }
  cursor: pointer;
  color: #eeeeee;
  
`


const ListDiv = Styled.div`

  
  text-align: left;
  font-size: 16px;
  color: #eeeeee;
  p, a{
    display: block;
    margin-left: 27px;
    padding-top: 13px;
    padding-bottom: 11px;
    border-bottom: 1.3px solid ${BG_COLOR_SUB3};
  }
  cursor: pointer;
  &:hover{

    background-color: ${BG_COLOR_SUB3};
  }
`



export default NavGroupList;
